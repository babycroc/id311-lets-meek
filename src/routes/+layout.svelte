<script>
  import Header from "../lib/components/Header.svelte";
  import "./styles.css";
  import "../app.postcss";

  import { onMount } from "svelte";
  import { auth, db } from "../lib/firebase/firebase";
  import { getDoc, doc, setDoc } from "firebase/firestore";
  import { authStore } from "../store/store";

  const nonAuthRoutes = ["/", "product"];

  onMount(() => {
      console.log("Mounting");
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
          const currentPath = window.location.pathname;

          if (!user && !nonAuthRoutes.includes(currentPath)) {
              window.location.href = "/";
              return;
          }

          if (user && currentPath === "/") {
              window.location.href = "/calendar";
              return;
          }

          if (!user) {
              return;
          }

          // @ts-ignore
          let dataToSetToStore;
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (!docSnap.exists()) {
              console.log("Creating User");
              const userRef = doc(db, "users", user.uid); // create user.uid doc within "users" collection
              dataToSetToStore = { // data to store in the doc userRef
                  email: user.email,
                  todos: [],
              };
              await setDoc(userRef, dataToSetToStore, { merge: true });
          } else {
              console.log("Fetching User");
              const userData = docSnap.data();
              dataToSetToStore = userData;
          }

          // @ts-ignore
          authStore.update((curr) => { // store the logged-in user data
              return {
                  ...curr,
                  user,
                  // @ts-ignore
                  data: dataToSetToStore,
                  loading: false,
              };
          });
          console.log(authStore);
      });
      return unsubscribe;
  });

</script>

<div class="app">
  <Header />

  <main>
    <slot />
  </main>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 64rem;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>
