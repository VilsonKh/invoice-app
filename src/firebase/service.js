import { collection, onSnapshot, getDocs, addDoc, doc, where, query } from "@firebase/firestore";
import { db } from "./config";
import { useContext, useEffect } from "react";
import invoiceContext from "../context/invoice/invoiceContext";

export const useQueryAllInvoicesData = () => {
	const { getAllInvoices, filters } = useContext(invoiceContext);
	useEffect(() => {
		console.log(filters);
		const ref = query(collection(db, "invoices"), filters.length > 0 ? where("status", "in", [...filters]) : "");
		onSnapshot(ref, (snapshot) => {
			let results = [];

			snapshot.docs.forEach((doc) => {
				results.push({ id: doc.id, ...doc.data() });
			});

			getAllInvoices(results);
		});
	}, [filters]);
};

export const useQueryAllInvoiceItems = () => {
	const { getAllInvoicesItems } = useContext(invoiceContext);
	useEffect(() => {
		const ref = collection(db, "invoiceItems");
		onSnapshot(ref, (snapshot) => {
			let results = [];
			snapshot.docs.forEach((doc) => {
				results.push({ id: doc.id, ...doc.data() });
			});

			getAllInvoicesItems(results);
		});
	}, []);
};
