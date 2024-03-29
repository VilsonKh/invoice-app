import { collection, onSnapshot, getDocs, addDoc, doc, where, query, deleteDoc, writeBatch, orderBy, updateDoc } from "@firebase/firestore";
import { db } from "./config";
import { useContext, useEffect } from "react";
import invoiceContext from "../context/invoice/invoiceContext";

/** Function gets all invoices from firestore */
export const useQueryAllInvoicesData = () => {
	const { getAllInvoices, filters, setIsPending } = useContext(invoiceContext);

	useEffect(() => {
		setIsPending(true);
		let ref = undefined;
		if (!filters.length) {
			return;
		} else {
			ref = query(collection(db, "invoices"), orderBy("createdAt", "desc"), where("status", "in", [...filters]));
		}

		onSnapshot(ref, (snapshot) => {
			let results = [];
			snapshot.docs.forEach((doc) => {
				results.push({ id: doc.id, ...doc.data() });
			});
			setIsPending(false);
			getAllInvoices(results);
		});
		//eslint-disable-next-line
	}, [filters]);
};

/** Function gets single invoice dynamic items
 * @params {string} docId - Firestore doc id
 * @params {function} method - Stores received data in context
 */
export const queryInvoiceItems = async (docId, method) => {
	const ref = query(collection(db, `invoices/${docId}/items`), orderBy("total"));
	await getDocs(ref).then((snapshot) => {
		const items = snapshot.docs;
		let result = [];
		items.map((item) => {
			return result.push({ ...item.data(), itemId: item.id });
		});
		method(result);
	});
};

/** Function add new invoice in firestore
 * @param {object} invoiceData - Data from form exclude dynamic items
 * @param {object} itemsData - Data from form, only dynamic items
 */
export const postNewInvoice = async (invoiceData, itemsData) => {
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

/** Function delete invoice from firestore
 * @param {string} docId - Firestore document id
 */
export const deleteInvoice = async (docId) => {
	await deleteDoc(doc(db, `invoices/${docId}`));
};

/** Function updates document in firestore
 * @param {string} invoceId - Firestore document id
 * @param {object} invoiceData - Data from form exclude dynamic inputs
 * @param {object} itemsData - Data from form only dynamic inputs
 * @param {array} deletedItemsId - Array with doc's id of items subcollection
 */
export const updateInvoice = async (invoiceId, invoiceData, itemsData, deletedItemsId) => {
	const batch = writeBatch(db);

	const invoiceRef = doc(db, "invoices", invoiceId);
	batch.set(invoiceRef, invoiceData);

	deletedItemsId.forEach((itemId) => {
		deleteDoc(doc(db, "invoices", invoiceId, "items", itemId));
	});

	itemsData.forEach((item) => {
		if (item.itemId) {
			batch.set(doc(db, "invoices", invoiceId, "items", item.itemId), { ...item });
			//дополнительная проверка нужна для добавления нового item в старом invoice,тк этот item нужно просто добавить, а не перезаписать
		} else {
			addDoc(collection(db, "invoices", invoiceId, "items"), { ...item });
		}
	});

	await batch.commit();
};

/** Functin updates invoice status */
export const updateInvoiceStatus = async (docId) => {
	const docRef = doc(db, "invoices", docId);
	await updateDoc(docRef, { status: "paid" });
};
