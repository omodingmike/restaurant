import {useDispatch, useSelector} from "react-redux";
import {useQuery} from "react-query";
import {BASE_URL} from "../backend/Constants/routes";
import axios from "axios";
import {setRestaurants} from "../redux/restaurantSlice";
import {Link} from "react-router-dom";
import React from "react";

export const TableComponent = (props) => {
    const restaurants = useSelector((state) => state.restaurantSlice.restaurants)
    const dispatch = useDispatch()
    const {data, isLoading} = useQuery(["data"], () => {
        return axios.get(BASE_URL).then((response) => {
            dispatch(setRestaurants(response.data))
        });
    })

    if (isLoading) {
        return <h1>Loading data please wait</h1>
    }

    return (
        <table className="table table-bordered">
            <thead>
            <tr className="text-center">
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Cuisine Type</th>
                <th scope="col">Location</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            {
                restaurants?.map((restaurant, index) =>
                    (<tr key={restaurant._id}>
                        <td>{index + 1}</td>
                        <td><img width="80" src={process.env.PUBLIC_URL + '/images/' + restaurant.image}
                                 alt="Example"/></td>
                        <td>{restaurant.name}</td>
                        <td>{restaurant.phone}</td>
                        <td>{restaurant.cuisine_type}</td>
                        <td>{restaurant.location}</td>
                        <td>
                            <Link className="btn btn-primary" to={`/edit/${restaurant._id}`}>Edit</Link>
                            <button className="btn btn-danger ms-3" onClick={
                                () => {
                                    const action = window.confirm("Are you sure you want to delete this Restaurant")
                                    if (action) {
                                        axios.delete(`${BASE_URL}/${restaurant._id}`).then((error) => {
                                            alert("Restaurant Deleted")
                                        })
                                    }
                                }
                            }>Danger
                            </button>
                        </td>
                    </tr>)
                )
            }
            </tbody>
        </table>
    )
}
