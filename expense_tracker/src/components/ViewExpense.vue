<script setup>

import { onMounted, ref, watch } from 'vue';
import { store } from "../store"

const total = ref(0)
const filter = ref("alle")
const filteredData = ref([])

const showExpense = async () => {
    total.value = 0
    const response = await fetch("http://localhost:3000/")
    const data = await response.json()
    store.expenses = data.data
    filteredData.value = store.expenses
    // console.log("FILTER: ", filter.value)
    // const filteredData = data.data.filter(item => item.category === filter.value)
    // store.expenses = filteredData
    // console.log("FD: ", filteredData)

    // if(filter.value == "alle") {   
    //     store.expenses = data.data
    // }
    

    //PReissumme berechner
    filteredData.value.forEach(item => {
        
        total.value = Math.round((total.value + item.price) * 100) / 100
        
    })
}

const filterExpenses = () => {
    
    
    console.log("FILTER: ", filter.value)
    filteredData.value = store.expenses.filter(item => item.category === filter.value)
    console.log("FD: ", filteredData)

    

}

onMounted(showExpense)



</script>

<template>
    <div class=" m-4 p-4 flex flex-col items-center ">
        <div class=" flex flex-col items-center justify-center lg:w-1/2">

            <!-- Filtern und anzeigen -->
            <div class="p-4 m-4 flex justify-between">
                <p class="text-5xl">Ausgaben im Überblick</p>
                <button class="w-1/3 m-4 p-4 border border-emerald-500 rounded-md hover:text-white 
        hover:bg-emerald-500 transition-all duration-300" @click="showExpense">Aktualisieren</button>
            </div>
        </div>

        <!-- filter nach ketgorie -->
        <div>
            <label>Filtern nach: </label>
            <select @change="filterExpenses" v-model="filter" class="text-center border rounded-lg  m-2 p-4 focus:outline-emerald-500">
                <option value="alle">-</option>
                <option value="wohnung">Wohnung</option>
                <option value="lebensmittel">Lebensmittel</option>
                <option value="transport">Transport</option>
                <option value="gesundheit">Gesundheit</option>
                <option value="versicherung">Versicherung</option>
                <option value="freizeit">Freizeit</option>
                <option value="sonstiges">Sonstiges</option>
            </select>
        </div>

        <div class="w-4/5 m-2 p-2 flex text-center">
            <div class="w-1/3">
                <p class="xl pb-2">Ausgabe</p>
                <hr />
            </div>
            <div class="w-1/3">
                <p class="xl pb-2">Preis</p>
                <hr />
            </div>
            <div class="w-1/3">
                <p class="xl pb-2">Kategorie</p>
                <hr />
            </div>

        </div>
        <hr />
        <!-- Ergebnisse -->
        <div class=" m-2 p-2 w-4/5 flex text-center" v-for="item in filteredData">
            <!-- Ausgabe -->
            <div class="w-1/3">
                <p class="text-2xl">{{ item.expense }}</p>
            </div>

            <!-- Preis -->
            <div class="w-1/3">
                <p class="text-2xl">{{ item.price }} €</p>
            </div>

            <!-- Kategorie -->
            <div class="w-1/3">
                <p class="text-2xl">{{ item.category }}</p>
            </div>

        </div>

        <div class=" w-4/5 mt-6 pt-6 flex">


            <div class="w-1/3"></div>

            <div class="w-1/3 text-center">
                <p class="p-2 border border-emerald-500 rounded-lg text-2xl">Gesamtausgabe: {{ total }} €</p>
            </div>
            <div class="w-1/3"></div>

        </div>

    </div>
</template>