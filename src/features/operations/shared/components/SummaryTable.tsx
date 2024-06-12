import { Box, Text } from "@mantine/core"
import { ReactNode } from "react"

interface Props {
    title: string
    children: ReactNode
}

export function SummaryTable({ title, children }: Props) {
    return (
        <Box ps={{ base: 0, md: 'xl' }}>
            <table style={{ tableLayout: 'fixed', width: "100%", margin: '25px auto 0' }}>
                <tbody>
                    <tr>
                        <td style={{ width: "60%" }}><Text fw="700">{title}</Text></td>
                        <td style={{ width: "40%", paddingLeft: 40 }}>
                            <Text fw="700">{children}</Text>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Box>
    )
}