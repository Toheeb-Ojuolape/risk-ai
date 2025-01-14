/* eslint-disable react/prop-types */
import { Table } from "@mantine/core";
import { Loader } from "@mantine/core";
import MenuButton from "../Buttons/MenuButton";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import reportService from "../../services/reportService";
import DeleteModal from "../Modal/DeleteModal";

function ReportTable({ loading, data }) {
  const [isDelete, setIsDelete] = useState(false);
  const [id, setId] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleDelete = (id) => {
    setId(id);
    setIsDelete(true);
  };

  const deleteAsset = async () => {
    try {
      setLoading(true);
      await reportService.deleteReport(id);
      window.location.reload();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const rows =
    data &&
    data.map((element, i) => (
      <Table.Tr key={i}>
        <Table.Td>{element._id}</Table.Td>
        <Table.Td>
          <ReactMarkdown>{element.summary.slice(0, 500) + "..."}</ReactMarkdown>
        </Table.Td>
        <Table.Td>{element.risk_score}</Table.Td>
        <Table.Td align={"center"}>
          <MenuButton id={element._id} handleDelete={handleDelete} />
        </Table.Td>
      </Table.Tr>
    ));

  return (
    <>
      <Table striped withColumnBorders withTableBorder stickyHeader>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Report Id</Table.Th>
            <Table.Th>Summary</Table.Th>
            <Table.Th>Risk Score</Table.Th>
            <Table.Th align={"center"}>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        {loading && (
          <Table.Tbody>
            <tr>
              <td colSpan="5">
                <Loader />
              </td>
            </tr>
          </Table.Tbody>
        )}
        {!loading && data && <Table.Tbody>{rows}</Table.Tbody>}

        {!loading && !data && <Table.Tbody> No available data</Table.Tbody>}
      </Table>
      <DeleteModal
        opened={isDelete}
        close={() => setIsDelete(false)}
        title={"Delete Report"}
        description={
          "Are you sure you want to delete this report?. This is an irreversible action. Once you delete this report, it's gone forever"
        }
        handleClick={deleteAsset}
        btnTitle={"Delete Asset"}
        loading={isLoading}
      />
    </>
  );
}

export default ReportTable;
