import { useForm } from "react-hook-form"
import { bangladeshCities } from "../../../Utils/Cities";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import usePublicAxios from "../../../Hooks/usePublicAxios";
import Swal from 'sweetalert2';


const OwnerUpdatePage = () => {

    const data = useLoaderData();
    const publicAxios = usePublicAxios();
    const navigate = useNavigate();

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        setValue('name', data?.name);
        setValue('bedroom', data?.bedroom);
        setValue('address', data?.address);
        setValue('city', data?.city);
        setValue('date', data?.date);
        setValue('describe', data?.describe);
        setValue('image', data?.image);
        setValue('phone', data?.phone);
        setValue('price', data?.price);
        setValue('size', data?.size);
        setValue('_id', data?._id);
        setValue('create', data?.create);
        setValue('email', data?.email);
        setValue('status', data?.status);

    }, [data, setValue])

    const onSubmit = (data) => {
        Swal.fire({
            title: "Sure Update ?",
            text: "You able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update it!"
        }).then((result) => {
            if (result.isConfirmed) {
                publicAxios.put(`/item/${data._id}`, data)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Updated!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            navigate(-1);
                        }
                    }).catch(err => {
                        console.log(err);
                    })
            }
        });
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="card-body max-w-xl mx-auto bg-blue-200 rounded-xl my-10">
            <h1 className=" text-center font-bold text-xl uppercase">Update House</h1>

            {/* Name Field */}
            <small className="font-bold text-gray-600">Enter Name</small>
            <input {...register("name", { required: true })} className="input input-bordered" placeholder="Enter your name" />
            {errors.name && <span className=" text-red-600 text-xs">This field is required</span>}

            {/* Address Field */}
            <small className="font-bold text-gray-600">Enter Address</small>
            <input {...register("address", { required: true })} className="input input-bordered" placeholder="Enter house address" />
            {errors.address && <span className=" text-red-600 text-xs">This field is required</span>}

            {/* City Field */}
            <small className="font-bold text-gray-600">Select City</small>
            <select className="p-3 rounded-lg input-bordered" {...register("city")}>
                {
                    bangladeshCities.map((one, i) => {
                        return (
                            <option key={i} value={one}>{one.toUpperCase()}</option>
                        )
                    })
                }
            </select>

            {/* Bed Room Number Field */}
            <small className="font-bold text-gray-600">Bed Room Numbers ( 1 - 6 )</small>
            <input {...register("bedroom", { required: true })} type="number" max={6} min={1} className="input input-bordered" placeholder="Bed room number" />
            {errors.bedroom && <span className=" text-red-600 text-xs">This field is required</span>}

            {/* Foom Size Field */}
            <small className="font-bold text-gray-600">Enter Maximum Flat Room Size ( 0 - 2000sqft )</small>
            <input {...register("size", { required: true })} type="number" max={2000} min={0} className="input input-bordered" placeholder="Enter room size" />
            {errors.size && <span className=" text-red-600 text-xs">This field is required</span>}

            {/* Room Image */}
            <small className="font-bold text-gray-600">Enter room image URL</small>
            <input {...register("image", { required: true })} type="text" className="input input-bordered" placeholder="Enter room image url" />
            {errors.image && <span className=" text-red-600 text-xs">This field is required</span>}

            {/* Avaialable Date Field */}
            <small className="font-bold text-gray-600">Enter Available Date</small>
            <input {...register("date", { required: true })} type="date" className="input input-bordered" />
            {errors.date && <span className=" text-red-600 text-xs">This field is required</span>}

            {/* Rent per month */}
            <small className="font-bold text-gray-600">Enter Rent Price /m. ( 3k - 18k : RAJUK standard) </small>
            <input {...register("price", { required: true })} type="number" min={0} max={18000} className="input input-bordered" placeholder="Enter price in Taka, like 5000" />
            {errors.price && <span className=" text-red-600 text-xs">This field is required</span>}

            {/* Phone number field */}
            <small className="font-bold text-gray-600">Enter your phone number</small>
            <input {...register("phone", { required: true })} type="number" className="input input-bordered" placeholder="Enter your phone number" />
            {errors.phone && <span className=" text-red-600 text-xs">This field is required</span>}

            {/* Description field */}
            <small className="font-bold text-gray-600">Write about your home</small>
            <textarea {...register("describe", { required: true })} type="text" className="textarea textarea-bordered" placeholder="Enter description" />
            {errors.describe && <span className=" text-red-600 text-xs">This field is required</span>}

            <div className="form-control mt-3">
                <button className="btn btn-primary uppercase">SUBMIT</button>
            </div>

        </form>
    )
}

export default OwnerUpdatePage