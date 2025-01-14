/* eslint-disable react/prop-types */
import { Table } from "@mantine/core";
import { Loader } from "@mantine/core";
import MenuButton from "../Buttons/MenuButton";
import { IconCopy } from "@tabler/icons-react";
import { handleSuccess } from "../../utils/handleResponse";
import { useState } from "react";
import DeleteModal from "../Modal/DeleteModal";
import assetsService from "../../services/assetsService";

function ChartTable({ loading, data }) {
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
      await assetsService.deleteAsset(id);
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
        <Table.Td>
          {element._id}{" "}
          <IconCopy
            className="pointer"
            size={"12px"}
            onClick={() => {
              navigator.clipboard.writeText(element._id),
                handleSuccess("Asset ID copied to clipboard");
            }}
          />{" "}
        </Table.Td>
        <Table.Td>{element.title}</Table.Td>
        <Table.Td>{element.country}</Table.Td>
        <Table.Td>{element.years_of_use}</Table.Td>
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
            <Table.Th>Asset Id</Table.Th>
            <Table.Th>Asset Name</Table.Th>
            <Table.Th>Location</Table.Th>
            <Table.Th>Years of Use</Table.Th>
            <Table.Th align={"center"}>Action</Table.Th>
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
        title={"Delete Asset"}
        description={
          "Are you sure you want to delete this asset?. This is an irreversible action. Once you delete this asset, it's gone forever"
        }
        handleClick={deleteAsset}
        btnTitle={"Delete Asset"}
        loading={isLoading}
      />
    </>
  );
}

export default ChartTable;
