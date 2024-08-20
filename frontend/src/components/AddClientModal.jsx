import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AiOutlineClose } from "react-icons/ai";

function AddClientModal({ isOpen, onClose }) {
  const [octet1, setOctet1] = useState("");
  const [octet2, setOctet2] = useState("");
  const [octet3, setOctet3] = useState("");
  const [octet4, setOctet4] = useState("");
  const [macAddress, setMacAddress] = useState(""); 
  const [name, setName] = useState("");

  const initialValues = {
    octet1: "",
    octet2: "",
    octet3: "",
    octet4: "",
    macAddress: "",
    name: "",
  };

  const handleChange = (e, setter, nextInput) => {
    const { value } = e.target;
    // Vérifier si le champ contient déjà 3 chiffres
    if (value.length <= 3) {
      // Vérifier si la valeur est supérieure à 255 ou si le champ est vide (pour permettre la suppression)
      if (parseInt(value) <= 255 || value === "") {
        setter(value);
        // Focus sur le prochain champ d'entrée si la longueur est de 3 chiffres
        if (value.length === 3 && nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleBlur = (e, setter) => {
    const { value } = e.target;
    if (parseInt(value) > 255) {
      setter(255);
    }
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log("Nouveau client :", values);
    resetForm();
    onClose();
  };

  const validationSchema = Yup.object({
    octet1: Yup.number()
      .required("Le premier octet est requis")
      .integer("Veuillez entrer un nombre entier")
      .min(0, "La valeur minimale est 0")
      .max(255, "La valeur maximale est 255"),
    octet2: Yup.number()
      .required("Le deuxième octet est requis")
      .integer("Veuillez entrer un nombre entier")
      .min(0, "La valeur minimale est 0")
      .max(255, "La valeur maximale est 255"),
    octet3: Yup.number()
      .required("Le troisième octet est requis")
      .integer("Veuillez entrer un nombre entier")
      .min(0, "La valeur minimale est 0")
      .max(255, "La valeur maximale est 255"),
    octet4: Yup.number()
      .required("Le quatrième octet est requis")
      .integer("Veuillez entrer un nombre entier")
      .min(0, "La valeur minimale est 0")
      .max(255, "La valeur maximale est 255"),
    macAddress: Yup.string().required("L'adresse MAC est requise"),
    name: Yup.string().required("Le nom du client est requis"),
  });
  const resetForm = () => {
    setOctet1("");
    setOctet2("");
    setOctet3("");
    setOctet4("");
    setMacAddress("");
    setName("");
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
        <AnimatePresence>
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content bg-[#fcfcfc] rounded-lg shadow-lg p-6 relative"
              initial={{ y: "-100vh" }}
              animate={{ y: 0 }}
              exit={{ y: "-100vh" }}
            >
              <button
                className="close-button absolute top-0 right-0 mt-2 mr-2 p-3 text-gray-600 hover:text-gray-800"
                onClick={() => {
                  onClose();
                  resetForm();
                }}
              >
                <AiOutlineClose />
              </button>
              <h2 className="text-xl font-bold mb-4">
                Ajouter un nouveau client
              </h2>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, values }) => (
                  <Form className="space-y-4">
                    <div>
                      <label
                        htmlFor="ipAddress"
                        className="block font-semibold mb-2"
                      >
                        Adresse IP :
                      </label>
                      <div className="flex items-end border shadow-sm bg-gray-50  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500   w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark: dark:shadow-sm-light">
                        <input
                          type="text"
                          id="octet1"
                          name="octet1"
                          value={octet1}
                          onChange={(e) =>
                            handleChange(
                              e,
                              setOctet1,
                              document.getElementById("octet2")
                            )
                          }
                          className="border-0 w-[70px] text-center bg-transparent   rounded-md px-3 py-2 mr-1 focus:outline-none "
                          placeholder="192"
                        />
                        <span className="mx-1 mb-2">.</span>
                        <input
                          type="text"
                          id="octet2"
                          name="octet2"
                          value={octet2}
                          onChange={(e) =>
                            handleChange(
                              e,
                              setOctet2,
                              document.getElementById("octet3")
                            )
                          }
                          className="border-0 w-[70px] text-center bg-transparent  rounded-md px-3 py-2 mr-1 focus:outline-none "
                          placeholder="168"
                        />
                        <span className="mx-1 mb-2">.</span>
                        <input
                          type="text"
                          id="octet3"
                          name="octet3"
                          value={octet3}
                          onChange={(e) =>
                            handleChange(
                              e,
                              setOctet3,
                              document.getElementById("octet4")
                            )
                          }
                          className="border-0 w-[70px] text-center bg-transparent  rounded-md px-3 py-2 mr-1 focus:outline-none "
                          placeholder="70"
                        />
                        <span className="mx-1 mb-2">.</span>
                        <input
                          type="text"
                          id="octet4"
                          name="octet4"
                          value={octet4}
                          onChange={(e) => handleChange(e, setOctet4)}
                          className="border-0 w-[70px] text-center bg-transparent  rounded-md px-3 py-2 mr-1 focus:outline-none "
                          placeholder="1"
                        />
                      </div>
                      {touched.octet1 &&
                        touched.octet2 &&
                        touched.octet3 &&
                        touched.octet4 &&
                        (errors.octet1 ||
                          errors.octet2 ||
                          errors.octet3 ||
                          errors.octet4) && (
                          <div className="text-red-500">
                            {"Veuillez entrer une adresse IP valide"}
                          </div>
                        )}
                    </div>
                    <div>
                      <label
                        htmlFor="macAddress"
                        className="block font-semibold mb-2"
                      >
                        Adresse MAC :
                      </label>
                      <input
                        type="text"
                        name="macAddress"
                        value={values.macAddress}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500 dark:shadow-sm-light"
                        placeholder="Adresse MAC"
                      />
                      {errors.macAddress && touched.macAddress && (
                        <div className="text-red-500">{errors.macAddress}</div>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block font-semibold mb-2"
                      >
                        Nom du client :
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500 dark:shadow-sm-light"
                        placeholder="Nom du client"
                      />
                      {errors.name && touched.name && (
                        <div className="text-red-500">{errors.name}</div>
                      )}
                    </div>
                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        className="bg-[#6298c7] text-white px-5 py-3 rounded-md  transition-colors duration-200"
                      >
                        Ajouter
                      </button>
                      <button
                        type="submit"
                        className="bg-gray-200 text-[#6298c7] px-5 py-3 rounded-md  transition-colors duration-200"
                      >
                        Ajouter
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    )
  );
}

export default AddClientModal;
