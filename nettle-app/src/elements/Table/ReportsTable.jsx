/* eslint-disable react/prop-types */
import { Table } from "@mantine/core";
import { Loader } from "@mantine/core";
import MenuButton from "../Buttons/MenuButton";
import ReactMarkdown from "react-markdown";

function ReportTable({ loading, data }) {
  const rows =
    data &&
    data.map((element, i) => (
      <Table.Tr key={i}>
        <Table.Td>{element._id}</Table.Td>
        <Table.Td>
          <ReactMarkdown>{element.summary.slice(0,500)+'...'}</ReactMarkdown>
        </Table.Td>
        <Table.Td>{element.risk_score}</Table.Td>
        <Table.Td align={"center"}>
          <MenuButton />
        </Table.Td>
      </Table.Tr>
    ));

  return (
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
  );
}

export default ReportTable;
