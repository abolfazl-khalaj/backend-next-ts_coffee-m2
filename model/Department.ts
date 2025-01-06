
import mongoose, { SchemaTypes } from "mongoose";
import { SubDepartmentType } from "./SubDepartment";

export interface DepartmentType {
    title : string ;
    subdepartment : SubDepartmentType[]
}

const SchemaDepartment = new mongoose.Schema({
    title: {
        type : SchemaTypes.String , 
        required : true
    },
    subdepartment: [{
        type: SchemaTypes.String ,
        ref: 'SubDepartment',
        required: false
    }]
},{timestamps: true})

const DepartmentModel = mongoose.models.Department || mongoose.model<DepartmentType>('Department', SchemaDepartment)

export default DepartmentModel