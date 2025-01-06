import mongoose, { SchemaTypes } from "mongoose";

export interface SubDepartmentType {
    department: string 
    title : string ;
}

const SchemaSubDepartment = new mongoose.Schema({
    department: {
        type: SchemaTypes.String , 
        ref: 'Department' ,
        required: true
    },
    title: {
        type : SchemaTypes.String , 
        required : true
    }
},{timestamps: true})

const SubDepartmentModel = mongoose.models.SubDepartment || mongoose.model<SubDepartmentType>('SubDepartment', SchemaSubDepartment)

export default SubDepartmentModel