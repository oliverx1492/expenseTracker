<script setup>
  import { store } from './store';
  import AddExpense from './components/AddExpense.vue';
  import ViewExpense from './components/ViewExpense.vue';
import { onMounted, ref } from 'vue';

  console.log("EXPENSES: ", store.expenses)
  const server_status = ref("Nicht verbunden")

  const checkServer = async () => {
    console.log("CHECKING SERVER STATUS")
    const response = await fetch("https://expensetracker-zj7y.onrender.com/checkStatus")
    const data = await response.json()
    server_status.value = data.message
  }

  onMounted( ()=> {
    checkServer()
  } )

</script>

<template>
  <div class=" p-2 m-2">
    <p class="text-sm">Server Status: {{ server_status }}</p>
  </div>
  <AddExpense />
  <ViewExpense />
</template>