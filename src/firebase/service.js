import { collection, onSnapshot, getDocs, addDoc, doc, where, query, deleteDoc, writeBatch, orderBy, setDoc, updateDoc } from "@firebase/firestore";
import { db } from "./config";
import { useContext, useEffect } from "react";
import invoiceContext from "../context/invoice/invoiceContext";

export const useQueryAllInvoicesData = () => {
	const { getAllInvoices, filters } = useContext(invoiceContext);

	useEffect(() => {
		let ref = query(collection(db, "invoices"), orderBy("paymentDue", "desc"));

		if (filters.length > 0) {
			ref = query(collection(db, "invoices"), orderBy("paymentDue", "desc"), where("status", "in", [...filters]));
		}

		onSnapshot(ref, (snapshot) => {
			let results = [];
			snapshot.docs.forEach((doc) => {
				results.push({ id: doc.id, ...doc.data() });
			});
			getAllInvoices(results);
		});
	}, [filters]);
};

export const queryInvoiceItems = async (docId, method) => {
	const ref = collection(db, `invoices/${docId}/items`);
	await getDocs(ref).then((snapshot) => {
		const items = snapshot.docs;
		let result = [];
		items.map((item) => {
			result.push({ ...item.data(), itemId: item.id });
		});
		method(result);
	});
};

export const postNewInvoice = async (invoiceData, itemsData) => {
	console.log("добавлен новый инвойс");
	const batch = writeBatch(db);

	//создает новый id документа
	const randNumb = [];
	while (randNumb.length < 8) {
		const numb = Math.floor(Math.random() * 100) + 1;
		if (randNumb.indexOf(numb) === -1) {
			randNumb.push(numb);
		}
	}

	//записывает новый инвойс
	const invoiceRef = doc(db, "invoices", randNumb.join(""));
	batch.set(invoiceRef, invoiceData);

	//записывает новую подколлекцию items
	const collectionRef = collection(invoiceRef, "items");
	itemsData.forEach((item) => {
		addDoc(collectionRef, { ...item });
	});

	await batch.commit();
};

export const deleteInvoice = async (docId) => {
	console.log("удален инвойс");
	await deleteDoc(doc(db, `invoices/${docId}`));
};

export const updateInvoice = async (invoiceId, invoiceData, itemsData, deletedItemsId) => {
	const batch = writeBatch(db);

	const invoiceRef = doc(db, "invoices", invoiceId);
	batch.set(invoiceRef, invoiceData);

	deletedItemsId.forEach((itemId) => {
		deleteDoc(doc(db, "invoices", invoiceId, "items", itemId));
	});

	itemsData.forEach((item) => {
		console.log(item);
		if (item.itemId) {
			batch.set(doc(db, "invoices", invoiceId, "items", item.itemId), { ...item });
			//дополнительная проверка нужна для добавления нового item в старом invoice,тк этот item нужно просто добавить, а не перезаписать
		} else {
			addDoc(collection(db, "invoices", invoiceId, "items"), { ...item });
		}
	});

	await batch.commit();
};

export const updateInvoiceStatus = async (docId) => {
	console.log(docId);
	const docRef = doc(db, "invoices", docId);
	await updateDoc(docRef, { status: "paid" });
};
