import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import addBg from '../../../assets/add.webp';
import { WithContext as ReactTags } from 'react-tag-input';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const AddProduct = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [tags, setTags] = useState([]);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();

  const [userProducts, setUserProducts] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Get real-time subscription info
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/user/${user.email}`)
        .then(res => {
          setIsSubscribed(res.data?.isSubscribed || false);
        });
    }
  }, [user, axiosSecure]);

  //Check user's existing products
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/products?email=${user.email}`)
        .then(res => setUserProducts(res.data));
    }
  }, [user, axiosSecure]);

  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = tag => {
    setTags([...tags, tag]);
  };

  const onSubmit = data => {

    //Restriction if not subscribed and already added 1
    if (!isSubscribed && userProducts.length >= 1) {
      return Swal.fire({
        icon: 'warning',
        title: 'Subscription Required',
        text: 'Subscribe first to add more than one product.',
        confirmButtonColor: '#d33'
      });
    }

    const fullData = {
      ...data,
      tags: tags.map(t => t.text),
      ownerName: user?.displayName,
      ownerEmail: user?.email,
      ownerImage: user?.photoURL,
      createdAt: new Date()
    };

    axiosSecure.post('/add-product', fullData)
      .then(res => {
        if (res.data.insertedId) {
          Swal.fire({
            title: 'Product Added!',
            text: 'Your product has been successfully submitted.',
            icon: 'success',
            confirmButtonColor: 'orange',
            confirmButtonText: 'OK'
          });
          reset();
          navigate("/dashboard/my-products");
        }
      });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-10"
      style={{ backgroundImage: `url(${addBg})` }}
    >
      <div className="w-full max-w-3xl p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Add a Product</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Product Name */}
          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text text-white">Product Name</span>
            </label>
            <input  {...register("productName", { required: true })} type="text" placeholder="Enter product name" className="input input-bordered w-full bg-transparent" required />
            {errors.productName && <p className="text-red-500">{errors.productName.message}</p>}
          </div>

          {/* Product Image */}
          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text text-white">Product Image URL</span>
            </label>
            <input {...register("productImage", { required: true })} type="text" placeholder="Enter image URL" className="input input-bordered w-full bg-transparent" required />
            {errors.productImage && <p className="text-red-500">{errors.productImage.message}</p>}
          </div>

          {/* Description */}
          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text text-white">Description</span>
            </label>
            <textarea {...register("description", { required: true })} className="textarea textarea-bordered w-full bg-transparent" placeholder="Write about your product..." required />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>

          {/* Owner Info (Read-only) */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Owner Name</span>
            </label>
            <input type="text" value={user?.displayName || ''} className="input input-bordered w-full bg-transparent" readOnly />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Owner Email</span>
            </label>
            <input type="text" value={user?.email || ''} className="input input-bordered w-full bg-transparent" readOnly />
          </div>

          {/* Owner Image */}
          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text text-white">Owner Image</span>
            </label>
            <input type="text" value={user?.photoURL || ''} className="input input-bordered w-full bg-transparent" readOnly />
            {user?.photoURL && (
              <div className="mt-2">
                <img
                  src={user.photoURL}
                  alt="Owner"
                  className="w-10 h-10 rounded-full border border-gray-500 shadow-md"
                />
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text text-white">Tags</span>
            </label>
            <div className="rounded-md p-2">
              <ReactTags
                tags={tags}
                delimiters={delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                inputFieldPosition="bottom"
                placeholder="  Press enter to add tag"
              />
            </div>
          </div>

          {/* External Link */}
          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text text-white">External Link</span>
            </label>
            <input {...register("externalLink")} type="url" placeholder="https://yourproduct.com" className="input input-bordered w-full bg-transparent" />
            {errors.externalLink && <p className="text-red-500">{errors.externalLink.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="form-control col-span-2">
            <button type="submit" className="btn bg-gradient-to-l from-gray-700 to-gray-500 rounded-3xl text-white w-full">Submit Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
