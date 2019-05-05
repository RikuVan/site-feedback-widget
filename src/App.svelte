<svelte:options immutable={true} />
<svelte:head>
	<link href="https://fonts.googleapis.com/css?family=Special+Elite" rel="stylesheet">
</svelte:head>

<script>
	import Layout from "./components/Layout.svelte";
	import StarRating from "./components/StarRating.svelte"
	import Spinner from "./components/Spinner.svelte"
	import OpenCloseTab from "./components/OpenCloseTab.svelte"
	import { onMount } from 'svelte'
	import { elasticOut } from 'svelte/easing'
	import { fade } from 'svelte/transition';
	import { stateStore as store, hide } from './store'
	import debounce from 'lodash.debounce'
	import storage from './localStorage'

	// prop
	export let feedbackOffset = 700
	// state
	let autoOpened = false
	let rating = 0
	let text = ''
	let closing = false
	$: isHidden = $store.current === 'idle'
	$: thanks = $store.current === 'thanks'
	$: if(thanks && !closing) {
		closing = true
		setTimeout(() => store.actions.close(), 3000)
	}
	$: form = $store.current === 'form'

	const listenerConfig = {capture: true, passive: true}
   const handleScroll = debounce(e => {
			const shouldShow = window.pageYOffset > feedbackOffset
			if (isHidden && !$store.init && !$hide) {
				store.actions.show()
			}
	 }, 2000)

	onMount(() => {
		!$hide && document.addEventListener('scroll', handleScroll, listenerConfig)
		return () => document.removeEventListener('scroll', handleScroll, listerConfig);
	})

	function onSubmit() {
		store.actions.submit(text)
		setTimeout(() => store.actions.finish('ok'), 1000)
	}
</script>

<style>
	:global(*) {
		box-sizing: border-box;
		margin: 0;
	}
	
	:global(div) {
		/* global variables */
		--font-color: #555;
		--border-color: #333;
		--spinner-size: 28px;
		--white: rgb(255,255,255);
		--off-white: rgb(217,217,217, 0.5);
		--spin-duration: 1s;
		--primary-blue: rgb(6, 93, 138);
		--hover-blue: rgb(8, 116, 170);
		--off-blue: rgb(6, 93, 218, 0.2);
		--star-color: rgb(255, 193, 0);
		--border-radius: 5px;

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
	  border-radius: var(--border-radius);
	}

	textarea:disabled {
		background: var(--off-white);
	}

	button {
    background: var(--primary-blue);
    appearance: none;
    border: none;
    text-transform: uppercase;
    color: white;
    letter-spacing: 0.5px;
    font-weight: bold;
    padding: 0.7rem 1.2rem;
    border-radius: 20rem;
    align-self: flex-end;
    cursor: pointer;
    font-size: 1rem;
	}

	button:hover {
    background: var(--hover-blue);
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
		<h1 slot="header">Rate this site</h1>
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
				<textarea bind:value={text} disabled={$store.submitting} />
				{#if $store.submitting}
					<Spinner />		
				{:else}
					<button>Submit</button>
				{/if}
			</form>
		</Layout>
		{:else}
		<div in:fade="{{duration: 1000, delay: 200}}"><OpenCloseTab /></div>
	{/if}
</span>