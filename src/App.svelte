<svelte:options immutable={true} />
<svelte:head>
	<link href="https://fonts.googleapis.com/css?family=Special+Elite" rel="stylesheet">
</svelte:head>

<script>
	import Layout from "./components/Layout.svelte";
	import StarRating from "./components/StarRating.svelte"
	import {onMount} from 'svelte'
	import { elasticOut } from 'svelte/easing'
	import debounce from 'lodash.debounce'

	export let feedbackOffset = 700
	let visible = false
	let rating = 0

	const listenerConfig = {capture: true, passive: true}

   const handleScroll = debounce(e => {
			visible = window.pageYOffset > feedbackOffset
	 }, 2000)

	onMount(() => {
		const listener = document.addEventListener('scroll', handleScroll, listenerConfig)
		return () => document.removeEventListener('scroll', handleScroll, listerConfig);
	})

	function rate(number) {
		rating = number
	}
</script>

<style>
	:global(*) {
		box-sizing: border-box;
		margin: 0;
	}
	
	:global(div) {
		--font-color: #555;
		--border-color: #333;
		color: var(--font-color);
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
			Helvetica, Arial, sans-serif, 'Apple Color Emoji',
			'Segoe UI Emoji', 'Segoe UI Symbol';
		font-size: 14px;
		line-height: 1.4;
	}

	textarea {
	  width: 100%;
	  border-radius: 5px;
	  border: 2px solid var(--font-color);
	  font-size: 20px;
	}

</style>

<span>
	{#if visible}
	<Layout>
		<h1 slot="header">Site feedback</h1>
		<StarRating current={rating} onStarClick={rate} />
		<a 
			slot="footer"
			href="https://github.com/webDevAndSausages/world-of-webdevandsausages" 
			target="_blank" 
			rel="noopener noreferrer"
		>Make an issue on Github</a>
	</Layout>
	{/if}
</span>