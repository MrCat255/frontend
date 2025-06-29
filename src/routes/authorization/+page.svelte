<div class="root">
    {#if auth}
    <div class="form">
        <h1>Авторизация</h1>
        <form>
            <input type="text" placeholder="никнейм" name="nickname">
            <input type="password" placeholder="пароль" name="password">
            <input type="submit">
        </form>
        <button type="button" onclick={() => auth = !auth}>зарегистрироваться</button>
    </div>
    {:else}
    <div class="form">
        <h1>Регистрация</h1>
        <form>
            <input type="text" placeholder="никнейм" name="nickname">
            <input type="password" placeholder="пароль" name="password">
            <input type="submit">
        </form>
        <button type="button" onclick={() => auth = !auth}>авторизоваться</button>
    </div>
    {/if}
</div>

<script lang="ts">
	let auth = $state(true);
</script>

<style>
.root {
    width: 100%;
    height: 90vh;
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
    gap: 20px;
    padding: 20px;
    width: 100%;
    max-width: 500px;
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
    border: none;
    background-color: #ffffff00;
    font-size: medium;
}
</style>