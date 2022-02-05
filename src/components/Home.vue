<template>
    <div class="w-full min-h-[calc(100vh-48px)] flex items-center justify-center bg-green-100 p-10">
        <div>
            <h1 class="text-2xl font-bold text-center">Create new voting</h1> <br>
            <input class="w-full outline-none bg-transparent border border-black rounded p-2 placeholder:text-gray-800" type="text" placeholder="Name" v-model="voting.name">
            <h2 class="trext-lg font-bold mt-5">Options</h2>
            <span v-for="(option, id) in voting.options" :key="id">
                <input class="w-full mb-2 outline-none bg-transparent border border-black rounded p-2 placeholder:text-gray-800" type="text" placeholder="Option" v-model="option.name"> <br>
            </span>
            <button @click="newOption()" class="mb-2 px-2 text-xl font-bold">+</button>
            <button @click="post()" class="p-2 border border-black rounded w-full">Create</button>
        </div>
    </div>
    <Footer />
</template>

<script>
import Footer from "./Footer.vue";
import { ref, child, push, getDatabase } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
export default {
    name: "Home",
    components: {
        Footer,
    },
    data(){
        return{
            voting: {
                id: "",
                name: "",
                options: [
                    {
                        name: "",
                        vote: 0
                    }
                ]
            }
        }
    },
    methods: {
        newOption(){
            this.voting.options.push({name: "", vote: 0});
        },
        post(){
            if (this.voting.name !== "" && this.voting.options[0].name !== ""){
                this.voting.id = uuidv4();
                const db = getDatabase();
                push(child(ref(db), "/votings"), { ...this.voting });
                this.voting.name = "";
                this.voting.options = [{name: "", vote: 0}];
                window.location = `/?id=${this.voting.id}`
            }
        }
    }
}
</script>