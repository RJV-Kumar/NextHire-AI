import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { PrepPlanProvider } from "./features/prepPlan/prepPlan.context.jsx"

function App() {
  return (
    <AuthProvider>
      <PrepPlanProvider>
        <RouterProvider router={router} />
      </PrepPlanProvider>
    </AuthProvider>
  )
}

export default App
