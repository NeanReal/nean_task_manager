import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
	{
		id: '1',
		name: 'Product1',
		desc: 'This is an amazing product',
		price: '300',
		amount: '30',
		reactions: {
			good: 0,
			soso: 0,
			bad: 0,
		},
	},
	{
		id: '2',
		name: 'Product2',
		desc: 'This is a nice product',
		price: '700',
		amount: '12',
		reactions: {
			good: 0,
			soso: 0,
			bad: 0,
		},
	},
]

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		reactionClicked(state, action) {
			const { productId, reaction } = action.payload
			const currentProduct = state.find((product) => product.id === productId)

			if (currentProduct) {
				currentProduct.reactions[reaction]++
			}
		},
		productAdded: {
			reducer(state, action) {
				state.push(action.payload)
			},
			prepare(name, desc, price, amount, sellerId) {
				return {
					payload: {
						id: nanoid(),
						name,
						desc,
						price,
						amount,
						seller: sellerId,
						reactions: {
							good: 0,
							soso: 0,
							bad: 0,
						},
					},
				}
			},
		},
		productUpdated(state, action) {
			const { id, name, desc, price, amount } = action.payload
			const desiredProduct = state.find((product) => product.id === id)

			if (desiredProduct) {
				desiredProduct.name = name
				desiredProduct.desc = desc
				desiredProduct.price = price
				desiredProduct.amount = amount
			}
		},
	},
})

export const { reactionClicked, productAdded, productUpdated } =
	productsSlice.actions
export default productsSlice.reducer

