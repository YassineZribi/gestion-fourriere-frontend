import { PRIVATE_API } from "../../../lib/axios/api";
import FetchWithPaginationResponse from "../../../types/FetchWithPaginationResponse";
import MeasurementUnit from "../../../types/MeasurementUnit";
import { UpsertMeasurementUnitDto } from "../components/UpsertMeasurementUnitModal";

class MeasurementUnitsService {
    getAllMeasurementUnitsByCriteria(criteria: string) {
        console.log({criteria});
        
        return PRIVATE_API.get<FetchWithPaginationResponse<MeasurementUnit>>("/measurement-units?" + criteria)
    }

    getAllMeasurementUnitsByNameOrSymbol(search: string) {
        
        return PRIVATE_API.get<MeasurementUnit[]>("/measurement-units/search?value=" + search)
    }

    getMeasurementUnitById(id: string | number) {
        
        return PRIVATE_API.get<MeasurementUnit>("/measurement-units/" + id)
    }

    createMeasurementUnit(data: UpsertMeasurementUnitDto) {
        return PRIVATE_API.post<MeasurementUnit>("/measurement-units", data)
    }

    updateMeasurementUnit(id: number, data: UpsertMeasurementUnitDto) {
        return PRIVATE_API.patch<MeasurementUnit>("/measurement-units/" + id, data)
    }

    deleteMeasurementUnit(id: number) {
        return PRIVATE_API.delete<MeasurementUnit>("/measurement-units/" + id)
    }
}

export default new MeasurementUnitsService()