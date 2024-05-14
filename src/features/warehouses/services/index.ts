import { PRIVATE_API } from "../../../lib/axios/api";
import FetchWithPaginationResponse from "../../../types/FetchWithPaginationResponse";
import Warehouse from "../../../types/Warehouse";
import { UpsertWarehouseDto } from "../components/UpsertWarehouseModal";

class WarehousesService {
    getAllWarehousesByCriteria(criteria: string) {
        console.log({criteria});
        
        return PRIVATE_API.get<FetchWithPaginationResponse<Warehouse>>("/warehouses?" + criteria)
    }

    createWarehouse(upsertWarehouseDto: UpsertWarehouseDto) {

        return PRIVATE_API.post<Warehouse>("/warehouses", upsertWarehouseDto)
    }

    updateWarehouse(id: number, upsertWarehouseDto: UpsertWarehouseDto) {

        return PRIVATE_API.patch<Warehouse>("/warehouses/" + id, upsertWarehouseDto)
    }

    deleteWarehouse(id: number) {
        return PRIVATE_API.delete<Warehouse>("/warehouses/" + id)
    }
}

export default new WarehousesService()