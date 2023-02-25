import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IProduct } from "../../../http/models/IProduct";
import ShopService from "../../../services/ShopService";
import { API_URL } from "../../../http";
import { IType } from "../../../http/models/IType";

export const getTypes = createAsyncThunk("shop/getTypes", async () => {
  try {
    const response = await ShopService.getTypes();

    return response.data;
  } catch (e) {
    throw new Error("something went wrong");
  }
});

export const getTypedProducts = createAsyncThunk(
  "shop/getTypedProducts",
  async (type: string, { rejectWithValue }) => {
    try {
      const response = await ShopService.getTypedProducts(type);
      console.log(response);
      if (response.data.status === 400) {
        return rejectWithValue("No products found");
      }
      return response.data;
    } catch (e) {
      throw new Error("something went wrong");
    }
  }
);

export const getProducts = createAsyncThunk("shop/getProducts", async () => {
  try {
    const response = await ShopService.getProducts();
    // console.log(response);
    return response.data;
  } catch (e) {
    throw new Error("something went wrong");
  }
});

export const getProduct = createAsyncThunk(
  "shop/getProduct",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await ShopService.getProduct(id);
      return response.data;
    } catch (e) {
      return rejectWithValue("Unexpected error");
    }
  }
);

const initialState = {
  products: [] as IProduct[],
  product: {} as IProduct,
  types: [] as IType[],
  typeStatus: "idle",
  productsStatus: "idle",
  productStatus: "idle",
  productsMessage: "",
  cartTotalAmount: 0,
  cartItems: [] as any[],
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    addProductToCart(state, action) {
      const addedProduct = action.payload;
      let updatedAmount = addedProduct.productAmount * addedProduct.price;
      let totalAmount = updatedAmount + state.cartTotalAmount;
      state.cartTotalAmount = totalAmount;

      const existingCartItemIndex = state.cartItems.findIndex(
        (product) =>
          product.id === addedProduct.id && product.size === addedProduct.size
      );

      let existingCartItem = state.cartItems[existingCartItemIndex];

      if (existingCartItem) {
        let updatedProduct = {
          ...existingCartItem,
          productAmount:
            existingCartItem.productAmount + addedProduct.productAmount,
        };
        state.cartItems[existingCartItemIndex] = updatedProduct;
      } else {
        state.cartItems.push(addedProduct);
      }
    },
    removeProduct(state, action) {
      const removedProduct = action.payload;
      console.log("removed", action.payload);
      const existingCartItemIndex = state.cartItems.findIndex(
        (product) =>
          product.id === removedProduct.id &&
          product.size === removedProduct.size
      );

      let existingCartItem = state.cartItems[existingCartItemIndex];
      state.cartTotalAmount = state.cartTotalAmount - existingCartItem.price;

      if (existingCartItem.productAmount === 1) {
        state.cartItems = state.cartItems.filter(
          (product) => {
            const productUniqueId = product.id + product.size;
            const payloadUniqueId = removedProduct.id + removedProduct.size;
            
            return productUniqueId !== payloadUniqueId
            
          }
        );
      } else {
        const updatedProduct = {
          ...existingCartItem,
          productAmount: existingCartItem.productAmount - 1,
        };
        state.cartItems[existingCartItemIndex] = updatedProduct;
      }
    },
  },
  extraReducers: (builder) => {
    //Get Products
    builder.addCase(getProducts.pending, (state, action) => {
      state.productsStatus = "loading";
    });
    builder.addCase(
      getProducts.fulfilled,
      (state, action: PayloadAction<IProduct[]>) => {
        state.products = action.payload;
        state.productsStatus = "completed";
      }
    );
    builder.addCase(getProducts.rejected, (state, action) => {
      state.products = [];
      state.productsStatus = "rejected";
    });

    //Get Product
    builder.addCase(getProduct.pending, (state) => {
      state.productStatus = "loading";
    });
    builder.addCase(
      getProduct.fulfilled,
      (state, action: PayloadAction<IProduct>) => {
        state.productStatus = "completed";
        state.product = action.payload;
      }
    );
    builder.addCase(getProduct.rejected, (state, action) => {
      state.productStatus = "rejected";
      state.products = [];
    });

    //Get Types
    builder.addCase(getTypes.pending, (state) => {
      state.typeStatus = "loading";
    });
    builder.addCase(
      getTypes.fulfilled,
      (state, action: PayloadAction<IType[]>) => {
        state.typeStatus = "completed";
        state.types = action.payload;
      }
    );
    builder.addCase(getTypes.rejected, (state, action) => {
      state.typeStatus = "rejected";
      state.types = [];
    });

    //Get Filtered Products
    builder.addCase(getTypedProducts.pending, (state) => {
      state.productsStatus = "loading";
    });
    builder.addCase(
      getTypedProducts.fulfilled,
      (state, action: PayloadAction<IProduct[]>) => {
        state.productsStatus = "completed";
        state.products = action.payload;
      }
    );
    builder.addCase(
      getTypedProducts.rejected,
      (state, action: PayloadAction<any>) => {
        state.productsStatus = "rejected";
        state.products = [];
        state.productsMessage = action.payload;
      }
    );
  },
});

export const { addProductToCart, removeProduct } = shopSlice.actions;
export default shopSlice.reducer;
