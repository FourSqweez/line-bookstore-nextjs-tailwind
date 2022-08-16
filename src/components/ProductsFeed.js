import React, { useState } from 'react'
import ContentModal from './ContentModal'
import ProductItem from './ProductItem'

const ProductsFeed = ({ books }) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [productId, setProductId] = useState()

	const booksAndQuantity = books.map((book) => {
		return { quantity: 0, ...book }
	})

	const renderModalElement = () => {
		const [book] = books.filter((book) => book.id === productId)
		return (
			<>
				{book && (
					<ContentModal
						book={book}
						handleModal={handleModal}
						isModalOpen={isModalOpen}
					/>
				)}
			</>
		)
	}

	const handleModal = (id) => {
		setIsModalOpen(!isModalOpen)
		setProductId(id)
	}

	const handleProps = () => {
		return (
			<>
				{booksAndQuantity.map((product) => (
					<ProductItem
						booksAndQuantity={booksAndQuantity}
						product={product}
						key={product.id}
						handleModal={handleModal}
					/>
				))}
			</>
		)
	}

	return (
		<>
			{isModalOpen === true ? (
				<>{productId && renderModalElement()}</>
			) : (
				<div className="m-w-7xl">
					<div className="grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-8 place-items-center">
						{books && handleProps()}
					</div>
				</div>
			)}
		</>
	)
}

export default ProductsFeed
