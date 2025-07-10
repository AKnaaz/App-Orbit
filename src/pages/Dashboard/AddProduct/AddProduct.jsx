import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import addBg from '../../../assets/add.webp';
import { WithContext as ReactTags } from 'react-tag-input';
import { div } from 'framer-motion/client';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const AddProduct = () => {
    const { user } = useAuth();
    console.log("plz",user)
    const [tags, setTags] = useState([]);

    const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = tag => {
        setTags([...tags, tag]);
    };

    return (
            <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-10"
      style={{ backgroundImage: `url(${addBg})` }}
    >
      <div
        className="w-full max-w-3xl p-8 rounded-2xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Add a Product</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text text-white">Product Name</span>
            </label>
            <input type="text" placeholder="Enter product name" className="input input-bordered w-full bg-transparent" required />
          </div>

          {/* Product Image */}
          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text text-white">Product Image URL</span>
            </label>
            <input type="text" placeholder="Enter image URL" className="input input-bordered w-full bg-transparent" required />
          </div>

          {/* Description */}
          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text text-white">Description</span>
            </label>
            <textarea className="textarea textarea-bordered w-full bg-transparent" placeholder="Write about your product..." required />
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
             {
                user?.photoURL && (
                <div className="mt-2">
                    <img
                    src={user.photoURL}
                    alt="Owner"
                    className="w-10 h-10 rounded-full border border-gray-500 shadow-md"
                    />
                </div>
                )
            }
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
            <input type="url" placeholder="https://yourproduct.com" className="input input-bordered w-full bg-transparent" />
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