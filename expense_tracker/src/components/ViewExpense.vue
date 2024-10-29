<script setup>

import { onMounted, ref, watch } from 'vue';
import { store } from "../store"

const total = ref(0)
const filter = ref("alle")
const filteredData = ref([])

const showExpense = async () => {

    
    const response = await fetch("https://expensetracker-zj7y.onrender.com/")
    const data = await response.json()
    store.expenses = data.data
    filteredData.value = store.expenses


    //PReissumme berechner
    calcTotat(filteredData)

}

const filterExpenses = () => {


    console.log("FILTER: ", filter.value)
    if (filter.value !== "alle") {
        filteredData.value = store.expenses.filter(item => item.category === filter.value)


        //PReissumme berechner
        calcTotat(filteredData)
    }

    else {

        filteredData.value = store.expenses
        calcTotat(filteredData)
    }

    console.log("FD: ", filteredData)



}

const calcTotat = (data) => {
    total.value = 0
    data.value.forEach(item => {
        total.value = Math.round((total.value + item.price) * 100) / 100
    })
}

const deleteExpense = async (expenseDetails) => {
    console.log("deletes", expenseDetails.id)
    try {
        const response = await fetch("https://expensetracker-zj7y.onrender.com/delete", {
            method: "POST",
            headers: {
                    "Content-Type": "application/json"
                },
            body: JSON.stringify(expenseDetails)
        })

        //Antowrt handlen
        const data = await response.json()
        console.log(data.message)
        showExpense()
    }

    catch(error) {
        console.error(error)
    }
}

onMounted(showExpense)

//Watch ob sich der store.updated ändert, dann ist ein neuer eintrag hinzugekommen
watch(
    () => store.updated, (newValue, oldValue) => {
        
        console.log("STORE UPDATED", store.updated)
        showExpense()
    }
)



</script>

<template>
    <div class=" m-4 p-4 flex flex-col items-center  ">
        <div class=" flex flex-col items-center justify-center lg:w-1/2 w-full">

            <!-- Filtern und anzeigen -->
            <div class="p-4 m-4 flex lg:flex-row flex-col justify-between items-center">
                <p class="text-5xl">Ausgaben im Überblick</p>
                <button class="lg:w-1/3 w-full m-4 p-4 border border-emerald-500 rounded-md hover:text-white 
        hover:bg-emerald-500 transition-all duration-300" @click="showExpense">Aktualisieren</button>
            </div>
        </div>

        <!-- filter nach ketgorie -->
        <div>
            <label>Filtern nach: </label>
            <select @change="filterExpenses" v-model="filter"
                class="text-center border rounded-lg  m-2 p-4 focus:outline-emerald-500">
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

        <div class="lg:w-4/5 w-full m-2 p-2 flex text-center">
            <div class="w-1/3">
                <p class="pb-2">Ausgabe</p>
                <hr />
            </div>
            <div class="w-1/3">
                <p class="pb-2">Preis</p>
                <hr />
            </div>
            <div class="w-1/4">
                <p class="pb-2">Kategorie</p>
                <hr />
            </div>


        </div>
        <hr />
        <!-- Ergebnisse -->
        <div class=" m-2 p-2 lg:w-4/5 w-full flex text-center" v-for="item in filteredData">
            <!-- Ausgabe -->
            <div class="w-1/3">
                <p class="lg:text-2xl text-lg">{{ item.expense }}</p>
            </div>

            <!-- Preis -->
            <div class="w-1/3">
                <p class="lg:text-2xl text-lg">{{ item.price }} €</p>
            </div>

            <!-- Kategorie -->
            <div class="lg:w-1/4 w-1/3">
                <p class="lg:text-2xl text-lg">{{ item.category }}</p>
            </div>

            <div class="" @click="deleteExpense(item)">
                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                    stroke="currentColor" class="size-6 transition-all hover:scale-150">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>

            </div>

        </div>

        <div class=" lg:w-4/5 w-full mt-6 pt-6 flex justify-center">


            <div class="lg:w-1/3"></div>

            <div class="lg:w-1/3 text-center">
                <p class="p-2 border border-emerald-500 rounded-lg text-2xl">Gesamtausgabe: {{ total }} €</p>
            </div>
            <div class="lg:w-1/3"></div>

        </div>

    </div>
</template>