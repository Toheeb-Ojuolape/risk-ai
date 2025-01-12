/* eslint-disable react/prop-types */
import { Flex, Table } from "@mantine/core";
import { Loader } from "@mantine/core";
import MenuButton from "../Buttons/MenuButton";

function ChartTable({ loading, data }) {
  const rows =
    data &&
    data.map((element, i) => (
      <Table.Tr key={i}>
        <Table.Td>{element.title}</Table.Td>
        <Table.Td>{element.country}</Table.Td>
        <Table.Td>{element.years_of_use}</Table.Td>
        <Table.Td>{element.last_incident}</Table.Td>
        <Table.Td align={"center"}>
          <MenuButton />
        </Table.Td>
      </Table.Tr>
    ));

  return (
    <Table striped withColumnBorders withTableBorder stickyHeader>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Asset Name</Table.Th>
          <Table.Th>Location</Table.Th>
          <Table.Th>Years of Use</Table.Th>
          <Table.Th>Last Incident</Table.Th>
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

      {!data && (
        <Table.Tbody>
          <Table.Tr>
            <Flex justify={"center"} my={"xl"}>Nothing to see here, yet..</Flex>
          </Table.Tr>
        </Table.Tbody>
      )}
    </Table>
  );
}

export default ChartTable;
