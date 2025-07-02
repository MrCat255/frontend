<div class="root">
    {#if auth}
    <div class="form">
        <h1>Авторизация</h1>
        <div class="container">
            <span class="massage_box" style="color: {massage_box_color};">{massage_box}</span>
        </div>
        <form onsubmit={send_to_auth}>
            <input type="text" bind:value={username} placeholder="имя пользователя" name="username">
            <input type="password" bind:value={password} placeholder="пароль" name="password">
            <input type="submit">
        </form>
        <button type="button" onclick={() => auth = !auth}>зарегистрироваться</button>
    </div>
    {:else}
    <div class="form">
        <h1>Регистрация</h1>
        <div class="container">
            <span class="massage_box" style="color: {massage_box_color};">{massage_box}</span>
        </div>
        <form onsubmit={send_to_reg}>
            <input type="text" bind:value={username} placeholder="имя пользователя" name="username">
            <input type="password" bind:value={password} placeholder="пароль" name="password">
            <input type="submit">
        </form>
        <button type="button" onclick={() => auth = !auth}>авторизоваться</button>
    </div>
    {/if}
</div>

<script lang="ts">
    import { goto } from "$app/navigation";
    import { userStore } from '$lib/stores/userStore';

	let auth = $state(true);
    let username = $state("");
    let password = $state("");
    let massage_box = $state("");
    let massage_box_color = $state("green");

    // API endpoints
    const LOGIN_URL = 'http://localhost:8000/api/v1/authorization';
    const REGISTER_URL = 'http://localhost:8000/api/v1/create_user';

    async function send_to_auth(event: Event) {send_to(event, LOGIN_URL)}
    async function send_to_reg(event: Event) {send_to(event, REGISTER_URL)}

    async function send_to(event: Event, url: string) {
        event.preventDefault();

        try {
            const payload = {
                username: username,
                password: password
            };
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            });

            if (!response.ok) {
                massage_box = response.statusText;
                massage_box_color = "red";
                throw new Error(`Response status: ${response.status}`);
            }

            const data = await response.json();
            massage_box = data.message;
            massage_box_color = "green";
            userStore.loadUser();
            goto("/");
        } catch (err) {
            console.error('Login error:', err);
        }
    }
</script>

<style>
:global(body) {
    margin: 0;
    /* width: 100vw;
    height: 100vh; */
    background-color: #efefef;
    display: flex;
    justify-content: center;
}
.root {
    font-size: large;
    display: flex;
    align-items: center;
    justify-content: center;
}
h1 {
    margin-bottom: 10px;
}
.form {
    display: grid;
    /* gap: 50px; */
    padding: 20px;
    width: 100%;
    max-width: 500px;
    background-color: white;
    border-radius: 20px;
}
form {
    display: grid;
    gap: 15px;
}
input {
    height: 40px;
    padding: 10px;
    box-sizing: border-box;
    font-size: large;
}
button {
    margin-top: 40px;
    margin-bottom: 20px;
    border: none;
    background-color: #ffffff00;
    font-size: medium;
}
.container {
    height: 50px;
    display: flex;
    align-items: center;
}
@media (width <= 700px) {
    :global(body) {
        background-color: white;
    }
}
</style>