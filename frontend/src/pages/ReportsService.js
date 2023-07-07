import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/ReportsService.css";
import { getService } from "../endpoints/db_service";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ModalMessage from "../components/ModalMessage";


function ReportsService() {
  const [reports, setReports] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalService, setTotalService] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getService();
        setReports(response);
        setTotalPrice(
          response.reduce((acc, { price }) => acc + parseFloat(price), 0)
        );
        setTotalService(response.length > 0 ? response.length : 0);
      } catch (error) {
        setModalTitle("Erro");
        setModalMessage("Erro ao carregar os serviços contate o suporte");
        setModalShow(true);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Relatório</h1>
      <div className="reports-container" id="reports-container">
        <div className="reports-summary">
          Total de serviços realizados: {totalService} <br />
          Dinheiro arrecadado: R$ {totalPrice}
        </div>
        <table className="reports-table">
          <thead className="reports-thead">
            <tr className="reports-tr">
              <th className="reports-th">Placa</th>
              <th className="reports-th">Tipo De Serviço</th>
              <th className="reports-th">Preço</th>
              <th className="reports-th">Data Do Serviço</th>
              <th className="reports-th">Descrição</th>
              <th className="reports-th"></th>
              <th className="reports-th"></th>
            </tr>
          </thead>
          <tbody className="reports-tbody">
            {reports &&
              reports.map((report) => (
                <tr key={report.id} className="reports-tr">
                  <td className="reports-td">{report.license_plate.number}</td>
                  <td className="reports-td">{report.type.name}</td>
                  <td className="reports-td">{report.price}</td>
                  <td className="reports-td">
                    {report.date.split("-").reverse().join("-")}
                  </td>
                  <td className="reports-td">{report.description}</td>
                  <td className="reports-td">
                    <i className="fa fa-edit"></i>
                  </td>
                  <td className="reports-td">
                    <i className="fa fa-trash"></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <ModalMessage
        show={modalShow}
        onClose={() => setModalShow(false)}
        title={modalTitle}
        message={modalMessage}
      />
    </div>
  );
}

export default ReportsService;
