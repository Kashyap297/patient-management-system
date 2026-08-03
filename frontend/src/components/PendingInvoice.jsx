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
        <div className="min-h-[80vh] bg-background p-6 md:p-8 space-y-8 relative overflow-hidden">
            {/* Decorative Blur Backgrounds */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow delay-1000"></div>

            <div className="relative z-10 animate-slide-up">
                <div className="glass p-8 md:p-10 rounded-3xl shadow-sm border border-white/50">
                    <div className="flex items-center justify-between mb-8 border-b border-gray-200/50 pb-6">
                        <h2 className="text-3xl font-extrabold text-secondary tracking-tight">
                            Pending Bills <span className="text-primary ml-2 bg-primary/10 px-3 py-1 rounded-full text-xl">{pendingInvoices.length}</span>
                        </h2>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-64 space-y-4">
                            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                            <p className="text-secondary font-medium animate-pulse">Loading Pending Bills...</p>
                        </div>
                    ) : pendingInvoices.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {pendingInvoices.map((invoice, index) => (
                                <div key={index} className="bg-white/40 backdrop-blur-md p-6 rounded-2xl border border-white/60 shadow-sm flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl group">
                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="bg-blue-50 text-primary font-bold text-sm px-3 py-1.5 rounded-lg border border-blue-100 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                                Bill No: {invoice.billNumber}
                                            </div>
                                            <button
                                                className="w-10 h-10 bg-white/50 backdrop-blur rounded-full flex items-center justify-center text-gray-500 hover:text-primary hover:bg-white transition-all duration-300 shadow-sm border border-gray-100"
                                                onClick={() => handleViewInvoice(invoice)}
                                            >
                                                <Visibility fontSize="small" />
                                            </button>
                                        </div>
                                        
                                        <div className="space-y-3 mt-5">
                                            <div className="flex flex-col">
                                                <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Patient Name</span>
                                                <span className="text-gray-800 font-bold text-lg">{invoice.patient.firstName} {invoice.patient.lastName}</span>
                                            </div>
                                            
                                            <div className="flex justify-between items-center border-t border-gray-100/50 pt-3">
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Bill Date</span>
                                                    <span className="text-gray-600 font-medium text-sm">{new Date(invoice.billDate).toLocaleDateString()}</span>
                                                </div>
                                                <div className="flex flex-col text-right">
                                                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Phone</span>
                                                    <span className="text-gray-600 font-medium text-sm">{invoice.phoneNumber}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-6 pt-4 border-t border-gray-100/50 flex justify-between items-center">
                                        <span className="text-sm font-semibold text-gray-500">Status</span>
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-600 border border-red-200">
                                            Unpaid
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 bg-white/30 backdrop-blur-md rounded-2xl border border-white/50">
                            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-2">All Caught Up!</h3>
                            <p className="text-gray-500">No pending bills found in the system.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PendingInvoice;
