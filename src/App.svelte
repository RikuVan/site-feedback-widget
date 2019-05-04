<svelte:options immutable={true} />
<svelte:head>
	<link href="https://fonts.googleapis.com/css?family=Special+Elite" rel="stylesheet">
</svelte:head>

<script>
	import Layout from "./components/Layout.svelte";
	import StarRating from "./components/StarRating.svelte"
	import OpenCloseTab from "./components/OpenCloseTab.svelte"
	import { onMount } from 'svelte'
	import { elasticOut } from 'svelte/easing'
	import { store } from './store'
	import debounce from 'lodash.debounce'
	import storage from './localStorage'

	// prop
	export let feedbackOffset = 700

	// state
	let autoOpened = false
	let rating = 0
	let text = ''
	$: isHidden = $store.current === 'idle'
	$: thanks = $store.current === 'thanks'
	$: form = $store.current === 'form'

	const listenerConfig = {capture: true, passive: true}
   const handleScroll = debounce(e => {
			const shouldShow = window.pageYOffset > feedbackOffset
			if (isHidden && !$store.init) {
				store.actions.show()
			}
	 }, 2000)

	onMount(() => {
		const feedback = storage.get()
		if (feedback === 'done' || feedback === 'seen') {
			return
		}
		const listener = document.addEventListener('scroll', handleScroll, listenerConfig)
		return () => document.removeEventListener('scroll', handleScroll, listerConfig);
	})

	function onSubmit() {
		store.actions.submit(text)
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
		background: #fff;
	}

	textarea {
		display: block;
    margin-bottom: 2rem;
    border: 1px solid var(--border-color);
    font-size: 1rem;
	  width: 100%;
		height: 100px;
	  border-radius: 5px;
	}

	button {
    background: #4088da;
    appearance: none;
    border: none;
    text-transform: uppercase;
    color: white;
    letter-spacing: 0.5px;
    font-weight: bold;
    padding: 1rem 2rem;
    border-radius: 20rem;
    align-self: flex-end;
    cursor: pointer;
    font-size: 1rem;
	}

	form {
		display: flex;
		flex-direction: column;
	}

	form > button {
		margin: auto;
	}
</style>

<span>
	{#if !isHidden && !thanks && !form}
	<Layout>
		<h1 slot="header">Site feedback</h1>
		<StarRating />
	</Layout>
	{:else if thanks}
		<Layout>
			<h1 slot="header">Thanks</h1>
		</Layout>
	{:else if form}
		<Layout>
			<h1 slot="header">Tell us what to fix</h1>
			<form on:submit|preventDefault={onSubmit}>
				<textarea bind:value={text} />
				<button>Submit</button>
			</form>
		</Layout>
	{/if}
</span>