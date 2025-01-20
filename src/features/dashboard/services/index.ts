import { PRIVATE_API } from "../../../lib/axios/api";
import IncomeStatisticsDto from "../../../types/dtos/IncomeStatisticsDto";
import OperationsQuantityStatisticsDto from "../../../types/dtos/OperationsQuantityStatisticsDto";
import { IncomeStatisticsRequestDto } from "../components/IncomeStatisticsForm";
import { OperationsQuantityStatisticsRequestDto } from "../components/OperationsQuantityStatisticsForm";
// /output-operations

class DashboardService {
    baseUrl = "/dashboard"

    getOperationsQuantityStatistics = (operationsQuantityStatisticsRequestDto: OperationsQuantityStatisticsRequestDto) => {
        return PRIVATE_API.get<OperationsQuantityStatisticsDto[]>(this.baseUrl + "/operations-quantity-statistics", {params: operationsQuantityStatisticsRequestDto})
    }

    getIncomeStatistics = (incomeStatisticsRequestDto: IncomeStatisticsRequestDto) => {
        return PRIVATE_API.get<IncomeStatisticsDto[]>(this.baseUrl + "/income-statistics", {params: incomeStatisticsRequestDto})
    }
}

export default new DashboardService()