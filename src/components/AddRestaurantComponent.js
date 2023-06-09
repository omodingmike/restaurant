import React from "react";
import {useForm} from "react-hook-form";
import * as validator from "yup"
import {yupResolver} from "@hookform/resolvers/yup";
import axios from "axios";
import {BASE_URL} from "../backend/Constants/routes";
import {Link, redirect} from "react-router-dom";
import {isValidPhoneNumber} from "../backend/Validator";


export const AddRestaurantComponent = (props) => {
    // const navigate = useNavigate()
    const onSubmit = (formData) => {
        const data = new FormData()
        data.append("image", formData.image[0])
        data.append("name", formData.name)
        data.append("phone", formData.phone)
        data.append("cuisine_type", formData.phone)
        data.append("location", formData.phone)
        axios.post(BASE_URL, data)
            .then((response) => {
                if (response.status === 200) {
                    alert("Restaurant Added successfully")
                    redirect("/")
                }
            })
    }

    const validatorSchema = validator.object().shape({
        name: validator.string().required("Name is required"),
        phone: validator.string().required("Phone is required")
            .test("phone", "Invalid Phone Number", (value) => {
                return isValidPhoneNumber(value)
            })
        ,
        cuisine_type: validator.string().required("Cuisine type is required"),
        location: validator.string().required("Location is required"),
        image: validator.mixed().required("Image is required")
    })
    const {handleSubmit, register, formState: {errors}} = useForm({
        resolver: yupResolver(validatorSchema)
    })
    return (
        <div>
            <Link className="btn btn-primary offset-1" to="/">All Restaurants</Link>
            <p className="display-6 text-center">Add New Restaurant</p>
            <div className="row">
                <div className="col-10 offset-1">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3 row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Restaurant Name:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="name" {...register("name")}/>
                                <p className="error">{errors.name?.message}</p>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Phone</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="inputPassword" {...register("phone")}/>
                                <p className="error">{errors.phone?.message}</p>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Cuisine Type</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control"
                                       id="inputPassword" {...register("cuisine_type")}/>
                                <p className="error">{errors.cuisine_type?.message}</p>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Location</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control"
                                       id="inputPassword" {...register("location")}/>
                                <p className="error">{errors.location?.message}</p>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Image</label>
                            <div className="col-sm-10">
                                <input className="form-control" type="file" required  {...register("image")}/>
                                <p className="error">{errors.image?.message}</p>
                            </div>
                        </div>


                        {/*<div className="mb-3 row">*/}
                        {/*    <label htmlFor="formFile" className="form-label">Image</label>*/}
                        {/*    <input className="form-control" type="file" required  {...register("image")}/>*/}
                        {/*    <p className="error">{errors.image?.message}</p>*/}
                        {/*</div>*/}
                        <div className="d-grid gap-2">
                            <button className="btn btn-primary" type={"submit"}> Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
