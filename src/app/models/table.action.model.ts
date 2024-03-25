//Acciones de la tabla

import { TABLE_ACTION } from "../enum/table-actions.enum"

export interface TableAction <T =any>{
    action: TABLE_ACTION,
    row:T

}