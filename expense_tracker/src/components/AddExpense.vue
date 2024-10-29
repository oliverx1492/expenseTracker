<script setup>

import { ref } from 'vue';

import { store } from '../store';

const new_input = ref("")
const price = ref("")
const category = ref("")

const msg = ref("")

const handleInput = (e) => {
    msg.value = ""
    e.preventDefault();
    
    //Funktion wird gecallt wenn einer der Eingaben fehlt
    if (!new_input.value || !price.value || !category.value) {
        console.log("Nicht vollständig")
        msg.value = "Ausgaben nicht vollständig"
    }

    else {
        //leeres Object wird erzeigt
        const obj = {}

        //die werte werden hinzugefügt
        obj["expense"] = new_input.value
        obj["price"] = price.value
        obj["category"] = category.value

        //Daten ans Backend senden
        console.log(obj)
        sendTobackend(obj)

        //Inputs werden resettet
        new_input.value = ""
        price.value = ""
        category.value = ""

        
    }


}

const sendTobackend = async (obj) => {
    try {
        const response = await fetch("https://expensetracker-zj7y.onrender.com/addExpense", {
            method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
        })

        const data = await response.json()
        if(response.ok) {
            console.log("RESPONSE OK")
            // hier wird die anzeige getriggert, da hier die rückmeldung aus dem bavkend erfolgt ist 
            // und die daten gespeichert sind 
            store.updated = !store.updated
        }

        else {
            console.log("RESPONSE NOT OKAY")
        }
    }

    catch(error) {
        console.error(error)
    }
}

</script>

<template>
    <p class="text-center text-5xl text-emerald-500">Ausgaben Tracker</p>
    <div class=" m-4 p-4 flex justify-center">
        
        <form @submit="handleInput" class="flex flex-col justify-center lg:w-1/2 w-full">
            <div class="flex flex-col justify-center">

                <input v-model="new_input" placeholder="Neue Ausgabe"
                    class="text-center m-2 p-4 border rounded-lg focus:outline-emerald-500" type="text" />

                <input v-model="price" placeholder="Preis" step="0.01" min="0"
                    class="text-center m-2 p-4 border rounded-lg focus:outline-emerald-500" type="number" />

                <select v-model="category" class="text-center border rounded-lg  m-2 p-4 focus:outline-emerald-500">
                    <option value="wohnung">Wohnung</option>
                    <option value="lebensmittel">Lebensmittel</option>
                    <option value="transport">Transport</option>
                    <option value="gesundheit">Gesundheit</option>
                    <option value="versicherung">Versicherung</option>
                    <option value="freizeit">Freizeit</option>
                    <option value="sonstiges">Sonstiges</option>
                </select>
            </div>

            <div class="flex justify-center">
                <input class="transition-all duration-300 w-1/3 m-4 p-4 border border-emerald-500 rounded-md hover:text-white hover:bg-emerald-500"
                    type="submit" value="Speichern" />
            </div>

            <p class="text-xl text-red-400 text-center m-2 p-2">{{ msg }}</p>
        </form>

    </div>

</template>
