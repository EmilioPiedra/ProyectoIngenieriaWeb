import { useAuth } from '../auth/AuthProvider';
import DefaultLayout from '../layout/DefaultLayout';

export default function Dashboard() {
    const auth = useAuth();

    return (
        <DefaultLayout>
            <h1>Dashboard de {auth.getUser()?.name}</h1>
        </DefaultLayout>
    );
}
