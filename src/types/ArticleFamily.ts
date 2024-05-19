import MeasurementUnit from "./MeasurementUnit"
import Register from "./Register"

export default interface ArticleFamily {
    id: number
    name: string
    description: string | null
    nightlyAmount: number
    unitCalculation: boolean
    photoPath: string | null
    register: Register | null
    measurementUnit: MeasurementUnit | null
}