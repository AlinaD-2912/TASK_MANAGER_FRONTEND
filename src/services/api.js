import axios from 'axios'

const apiClient = axios.create({
    baseURL: '/tasks',
    headers: {
        'Content-Type': 'application/json',
    },
})

apiClient.interceptors.request.use((request) => {
    console.log('Starting Request', request)
    return request
})

export const api = {
    getHello() {
        return apiClient.get(`/hello`)
    },
    getTasks() {
        return apiClient.get('')
    },
    addTask(task) {
        return apiClient.post('', task)
    },
    deleteTask(taskId) {
        return apiClient.delete(`/${taskId}`)
    },
    completeTask(taskId) {
        return apiClient.put(`/${taskId}/complete`)
    },
}
