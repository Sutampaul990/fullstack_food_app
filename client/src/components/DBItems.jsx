import React from 'react';
import {DataTable} from '../components';
import { HiCurrencyRupee } from "../assets/icons";

const DBItems = () => {

  
  
  return (
    <div className=" flex items-center justify-self-center gap-4 pt-6 w-full">
      <DataTable columns={[
        {
          title: "Image",
          field: "image_url",
          render: (rowData) => (
            <img
              src={rowData.image_url}
              className="w-32 h-16 object-contain rounded-md"
            />
          ),
        },
        {
          title: "Name",
          field: "product_name",
        },
        {
          title: "Category",
          field: "product_category",
        },
        {
          title: "Price",
          field: "product_price",
          render: (rowData) => (
            <p className="text-xl font-semibold text-textColor flex items-center justify-center ">
              <HiCurrencyRupee className="text-red-400" />
              {parseFloat(rowData.product_price).toFixed(2)}
            </p>
          ),
        },
      ]} />
    </div>
  )
}

export default DBItems
