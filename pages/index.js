import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import ProductsFeed from '../src/components/ProductsFeed'
import { getBooksAPI, getPromotionsAPI } from './api/booksApi'
import { useDispatch } from 'react-redux'
import { addPromotions } from '../src/app/slices/promotionSlice'
import { useRouter } from 'next/router'

export default function Home({ books, promotions }) {
	const router = useRouter()
	const { searchInput, setSearchInput } = router.query
	const dispatch = useDispatch()
	const [newBook, setNewBook] = useState([])

	const a = 'Harry is find'
	const b = a.search('Harry is find')

	console.log('Test : ', b)
	console.log('Book quantity : ', newBook.length)

	useEffect(() => {
		//const bookTitle = books.map((b) => b.title)
		//console.log('Book Title : ', bookTitle)
		//const book = books.map((book) => book)
		// const bookFromSearch = bookTitle.filter((str) =>
		// 	str.toLowerCase().match(searchInput)
		// )
		// console.log('bookFromSearch : ', bookFromSearch)

		if (searchInput) {
			const newBooks = books.filter((book) =>
				book.title.toLowerCase().match(searchInput)
			)
			setNewBook(newBooks)
		}
	}, [searchInput])

	console.log('New book :', newBook)

	console.log('Search : ', searchInput)
	useEffect(() => {
		dispatch(addPromotions(promotions))
	}, [1])

	// const filterDataToRender = (e) => {
	// 	if (newBook.length === 0 && searchInput.isEmpty) {
	// 		return <ProductsFeed books={books} />
	// 	} else if (newBook.length !== 0 && e.key === 'Enter') {
	// 		return <ProductsFeed books={newBook} />
	// 	} else if (newBook.length === 0 && e.key === 'Enter') {
	// 		return `Not have a books that match with '${searchInput}'`
	// 	}
	// 	return <ProductsFeed books={books} />
	// }

	return (
		<div className="mx-1 sm:mx-10 mb-16">
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="mt-5 flex flex-col justify-center items-center">
				{newBook.length === 0 ? (
					<ProductsFeed books={books} />
				) : (
					<ProductsFeed books={newBook} />
				)}
			</main>
		</div>
	)
}

export async function getServerSideProps() {
	const booksData = await getBooksAPI().then((res) => res.data)
	const promotionsData = await getPromotionsAPI().then((res) => res.data)

	return {
		props: {
			books: booksData,
			promotions: promotionsData,
		},
	}
}