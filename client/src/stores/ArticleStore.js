import { ref } from "vue";
import { $api, API_URL } from "@/http/api";
import { defineStore } from "pinia";
import axios from "axios";

export const useArticleStore = defineStore('ArticleStore', () => {
    const articles = ref([])

    const fetchArticles = async () => {
        try {
            const response = await $api.get('/article')

            articles.value = [...response.data]

            for (const article of articles.value) {
                try {
                    const response = await $api.get(`/user/${article.author}`)
                    article.author = response.data
                } catch (error) {
                    console.log(error);
                }
            }

            console.log(articles.value)
        } catch (error) {
            console.log(error)
        }
    }

    const getArticleDetail = async (article) => {
        try {
            const detail = await $api.get(`article/${article.id}/detail`)

            article.content.detail = { ...detail }

            return {
                article
            }
        } catch (error) {
            console.log(error)
        }
    }

    return {
        articles,
        fetchArticles,
        getArticleDetail
    }
})