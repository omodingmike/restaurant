import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import * as validator from "yup"
import {yupResolver} from "@hookform/resolvers/yup";
import axios from "axios";
import {BASE_URL} from "../backend/Constants/routes";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setRestaurants} from "../redux/restaurantSlice";

export const EditRestaurantComponent = () => {
    const {id} = useParams();
    const validatorSchema = validator.object().shape({
        name: validator.string().required("Name is required"),
        phone: validator.string().required("Phone is required"),
        cuisine_type: validator.string().required("Cuisine type is required"),
        location: validator.string().required("Location is required"),
        image: validator.mixed().required("Image is required")
    })
    const restaurants = useSelector((state) => state.restaurantSlice.restaurants)
    let restaurant = {}
    const dispatch = useDispatch()
    // const {data, isLoading} = useQuery(["data"], () => {
    //     return axios.get(`${BASE_URL}/${id}`).then((response) => {
    //         dispatch(setRestaurants(response.data))
    //         return response.data
    //     });
    // })

    useEffect(() => {
        // Make your network request here
        // You can use any network library like fetch, axios, etc.
        axios.get(`${BASE_URL}/${id}`)
            .then(data => {
                // Handle the data
                dispatch(setRestaurants(data.data))
                // restaurant = data.data
                // console.log(data);
            })
            .catch(error => {
                // Handle any error that occurred during the request
                console.error(error);
            });
    }, []);
    const {handleSubmit, register, formState: {errors}} = useForm({
        resolver: yupResolver(validatorSchema),
        // defaultValues: {
        //     name: data.name,
        //     phone: data.phone,
        //     cuisine_type: data.cuisine_type,
        //     location: data.location
        // }
    })

    console.log(restaurants);
    // if (isLoading) {
    //     return <h1>Loading data please wait</h1>
    // }

    const onSubmit = async (formData) => {
        const data = new FormData()
        if (formData.image) {
            data.append("image", formData.image[0])
        }
        data.append("name", formData.name)
        data.append("phone", formData.phone)
        data.append("cuisine_type", formData.phone)
        data.append("location", formData.phone)
        const response = await axios.post(BASE_URL, data)
        // const response = await axios.post(BASE_URL, formData)
        if (response.status === 200) {
            // navigate('/');
            // return <Navigate to="/"/>
        }
    }
    return (
        <div>
            <Link to="/">Home</Link>
            <p className="display-6">Edit restaurant</p>
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
                        <input type="text" className="form-control"
                               id="inputPassword" {...register("phone")}/>
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
                <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">Image</label>
                    <input className="form-control" type="file" required  {...register("image")}/>
                    <p className="error">{errors.image?.message}</p>
                </div>
                <button className="btn btn-primary" type={"submit"}> Submit</button>
            </form>
        </div>
    )
}
