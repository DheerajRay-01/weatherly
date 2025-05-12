const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwritProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwritDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwritCollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID), 
    weatherApiKey:String(import.meta.env.VITE_WEATHER_API_KEY), 
    forcastApiKey:String(import.meta.env.VITE_FORCAST_API_KEY), 
}
export default conf