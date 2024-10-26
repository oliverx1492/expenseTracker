<script setup>
  import { store } from './store';
  import AddExpense from './components/AddExpense.vue';
  import ViewExpense from './components/ViewExpense.vue';

  console.log("EXPENSES: ", store.expenses)

</script>

<template>
  <AddExpense />
  <ViewExpense />
</template>