import { useAuth } from '../auth/AuthProvider';
import PortalLayout from '../layout/PortalLayout';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const auth = useAuth();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/Dashboard');
    };

    return (
        <PortalLayout>
            <button type="button" onClick={handleClick}>
                regresar
            </button>
            <h1 className="text-3xl font-bold">order status</h1>
        </PortalLayout>
    );
}
