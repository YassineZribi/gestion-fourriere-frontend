import { ReactNode, useMemo, useState } from "react";
import { Button, Flex, Group, Select, Stack, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import dashboardService from "../services"
import registersService from "../../registers/services"
import articleFamiliesService from "../../article-families/services"
import { useTranslation } from "react-i18next";
import { YearPickerInput } from "@mantine/dates";
import Register from "../../../types/Register";
import SearchableCombobox from "../../../components/SearchableCombobox";
import RegisterSelectOption from "../../registers/components/RegisterSelectOption";
import ArticleFamily from "../../../types/ArticleFamily";
import ArticleFamilySelectOption from "../../article-families/components/ArticleFamilySelectOption";
import IncomeStatisticsDto from "../../../types/dtos/IncomeStatisticsDto";
import { MONTHS } from "../../../utils/constants";

const schema = z.object({
    articleFamilyId: z.number().nullable(),
    registerId: z.number().nullable(),
    sourceId: z.number().nullable(),
    month: z.string().nullable(),
    year: z.date({ invalid_type_error: "Year is required" }),
    period: z.enum(['months', 'days'], { invalid_type_error: "Period is required" }),
    filterBy: z.enum(['none', 'register', 'articleFamily'], { invalid_type_error: "Period is required" }),
}).superRefine((data, ctx) => {
    if (data.period === 'days' && !data.month) {
        ctx.addIssue({
            path: ['month'],
            message: 'Month is required',
            code: z.ZodIssueCode.custom,
        });
    }
    if (data.filterBy === "register" && !data.registerId) {
        ctx.addIssue({
            path: ['registerId'],
            message: 'Register is required',
            code: z.ZodIssueCode.custom,
        });
    }
    if (data.filterBy === "articleFamily" && !data.articleFamilyId) {
        ctx.addIssue({
            path: ['articleFamilyId'],
            message: 'ArticleFamily is required',
            code: z.ZodIssueCode.custom,
        });
    }
});;

export type FormData = z.infer<typeof schema>

export type IncomeStatisticsRequestDto = Omit<FormData, 'year' | 'period' | 'filterBy'> & { year: number }

interface Props {
    initialValues: IncomeStatisticsRequestDto
    dropdownExportFormats: ReactNode
    onSubmit: (selectedData: IncomeStatisticsRequestDto, retrievedStatistics: IncomeStatisticsDto[]) => void
}

export default function IncomeStatisticsForm({ initialValues, dropdownExportFormats, onSubmit }: Props) {
    const [isSubmitting, setSubmitting] = useState(false)

    const [register, setRegister] = useState<Register | null>(null)
    const [articleFamily, setArticleFamily] = useState<ArticleFamily | null>(null)

    const { t } = useTranslation()
    const { t: tGlossary } = useTranslation("glossary")

    const selectMonthData = useMemo(() => (
        [
            // { value: "", label: "Sélectionner mois", disabled: true },
            ...MONTHS.map((month, index) => ({ value: String(index + 1), label: t(`months.${month}`) }))
        ]
    ), [t]);

    const selectPeriodData = useMemo(() => [
        { value: "months", label: t("components.incomeStatisticsForm.incomeDistributionBy.options.months") },
        { value: "days", label: t("components.incomeStatisticsForm.incomeDistributionBy.options.days") },
    ], [t]);
    
    const selectFilterByData = useMemo(() => [
        { value: "none", label: t("components.incomeStatisticsForm.filteringBy.options.notSpecified") },
        { value: "register", label: t("components.incomeStatisticsForm.filteringBy.options.register") },
        // { value: "articleFamily", label: "Famille d'articles" }, // I comment only this line to verify if articleFamily will exists on IncomeStatistics
    ] as const, [t]);


    const form = useForm<FormData>({
        initialValues: {
            articleFamilyId: initialValues.articleFamilyId,
            registerId: initialValues.registerId,
            sourceId: initialValues.sourceId,
            month: initialValues.month,
            year: new Date(initialValues.year, 0, 1), // Month is 0-based (0 for January), Day is 1-based,
            period: 'months',
            filterBy: 'none'
        },
        validate: zodResolver(schema),
    });

    const handleSubmit = async (data: FormData) => {
        const upsertSourceDto: IncomeStatisticsRequestDto = {
            articleFamilyId: data.articleFamilyId,
            registerId: data.registerId,
            sourceId: data.sourceId,
            month: data.month,
            year: data.year.getFullYear(),
        }

        console.log(data);
        console.log(upsertSourceDto);

        try {
            setSubmitting(true)
            const res = await dashboardService.getIncomeStatistics(upsertSourceDto)
            const retrievedStatistics = res.data

            onSubmit(upsertSourceDto, retrievedStatistics)
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false)
        }
    }

    const clearArticleFamilySelection = () => {
        setArticleFamily(null)
        form.setFieldValue("articleFamilyId", null)
        form.clearFieldError("articleFamilyId")
    }

    const clearRegisterSelection = () => {
        setRegister(null)
        form.setFieldValue("registerId", null)
        form.clearFieldError("registerId")
    }

    form.watch('period', ({ previousValue, value }) => {
        if (previousValue !== value)
            form.setFieldValue("month", null)
    });
    form.watch('filterBy', ({ previousValue, value }) => {
        if (previousValue !== value) {
            clearArticleFamilySelection()
            clearRegisterSelection()
        }
    });

    return (
        <form autoComplete="off" onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <Flex gap="5" align={"center"} justify={"center"}>
                    <Title order={4}>{t("components.incomeStatisticsForm.title")}</Title>
                    {/* مداخيل الحجز البلدي خلال سنة 2024 */}
                    <YearPickerInput
                        name="year"
                        // minDate={new Date(input.year, 0, 1)}
                        {...form.getInputProps('year')}
                    />
                </Flex>
                <Flex gap="5" align="baseline">
                    <Title order={6}>{t("components.incomeStatisticsForm.incomeDistributionBy.title")}</Title>
                    <Flex gap="5" style={{ flexGrow: 1 }} direction={"column"}>
                        <Select
                            placeholder="Period"
                            name="period"
                            withAsterisk
                            data={selectPeriodData}
                            {...form.getInputProps('period')}
                        />
                        {form.values.period === "days" && (
                            <Select
                                placeholder="Sélectionner un mois"
                                name="month"
                                clearable
                                withAsterisk
                                withScrollArea={false}
                                styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
                                data={selectMonthData}
                                {...form.getInputProps('month')}
                            />
                        )}
                    </Flex>
                </Flex>
                <Flex gap="5" align="baseline">
                    <Title order={6}>{t("components.incomeStatisticsForm.filteringBy.title")}</Title>
                    {/* اختيار المحجوز حسب */}
                    <Flex gap="5" style={{ flexGrow: 1 }} direction="column">
                        <Select
                            placeholder="Filtrer par"
                            name="filterBy"
                            withAsterisk
                            data={selectFilterByData}
                            {...form.getInputProps('filterBy')}
                        />
                        {form.values.filterBy === "register" && (
                            <SearchableCombobox
                                selectedEntity={register}
                                placeholder={"Sélectionner un registre"}
                                error={form.errors.registerId?.toString()}
                                withAsterisk
                                onFetch={registersService.getAllRegistersByName}
                                onSelectOption={(newRegister: Register | null) => {
                                    setRegister(newRegister)
                                    if (newRegister) {
                                        form.setFieldValue("registerId", newRegister.id)
                                    }
                                    form.clearFieldError("registerId")
                                }}
                                onClear={clearRegisterSelection}
                                shouldClearOption={!register}
                            >
                                {
                                    (register) => <RegisterSelectOption register={register} />
                                }
                            </SearchableCombobox>
                        )}
                        {form.values.filterBy === "articleFamily" && (
                            <SearchableCombobox
                                selectedEntity={articleFamily}
                                placeholder={"Sélectionner une famille d'articles"}
                                // label={tGlossary("article.articleFamily")}
                                error={form.errors.articleFamilyId?.toString()}
                                withAsterisk
                                onFetch={articleFamiliesService.getAllArticleFamiliesByName}
                                onSelectOption={(newArticleFamily: ArticleFamily | null) => {
                                    setArticleFamily(newArticleFamily)
                                    if (newArticleFamily) {
                                        form.setFieldValue("articleFamilyId", newArticleFamily.id)
                                    }
                                    form.clearFieldError("articleFamilyId")
                                }}
                                onClear={clearArticleFamilySelection}
                                shouldClearOption={!articleFamily}
                            >
                                {
                                    (articleFamily) => <ArticleFamilySelectOption articleFamily={articleFamily} />
                                }
                            </SearchableCombobox>
                        )}
                    </Flex>
                </Flex>
            </Stack>

            <Group justify="flex-end" mt="md">
                {/* <Anchor component="button" type="button" variant="gradient" onClick={() => { }} size="sm">
                    {t("buttons.cancel")}
                </Anchor> */}
                {dropdownExportFormats}
                <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                    {t("buttons.search")}
                </Button>
            </Group>
        </form>
    )
}