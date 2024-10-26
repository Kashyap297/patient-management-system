import React, { useEffect, useState } from "react";
import api from "../api/api"; // Ensure the correct path to your axios setup file
import { Visibility } from "@mui/icons-material";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    IconButton,
    Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const PendingInvoice = () => {
    const [pendingInvoices, setPendingInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPendingInvoices = async () => {
            try {
                const response = await api.get("/invoice");
                const unpaidInvoices = response.data.data.filter(bill => bill.status === "Unpaid");
                setPendingInvoices(unpaidInvoices);
            } catch (error) {
                console.error("Error fetching invoices:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPendingInvoices();
    }, []);
    console.log(pendingInvoices)


    const handleViewInvoice = (bill) => {
        navigate(`/admin/invoice/${bill._id}/${bill.patient?.firstName}`);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md m-4">
            <h2 className="text-xl font-semibold mb-6">Pending Bills ({pendingInvoices.length})</h2>

            {loading ? (
                <p className="text-center">Loading...</p>
            ) : pendingInvoices.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {pendingInvoices.map((invoice, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg shadow flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-md font-bold">
                                        Bill No: <span className="text-blue-600">{invoice.billNumber}</span>
                                    </h3>
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleViewInvoice(invoice)}
                                    >
                                        <Visibility />
                                    </IconButton>
                                </div>
                                <p className="text-sm text-gray-500">Bill Date: {new Date(invoice.billDate).toLocaleDateString()}</p>
                                <p className="text-sm">Patient Name: <strong>{invoice.patient.firstName} {invoice.patient.lastName}</strong></p>
                                <p className="text-sm">Phone Number: <strong>{invoice.phoneNumber}</strong></p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center">
                    <p className="text-gray-500">No Pending Bills Found</p>
                </div>
            )}
        </div>
    );
};

export default PendingInvoice;
