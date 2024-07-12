import "server-only";
import { dbnav } from "../drizzle/nav";
import { sql } from 'drizzle-orm';

export async function settingsSideBar(menu: number) {
  const table = "react-template2_menu";

  const data = await dbnav.execute(sql`
    WITH RECURSIVE item_hierarchy AS (
      SELECT
        id,
        menu,
        label,
        href,
        parent_id,
        CONCAT(
          '{',
            '"id":', id, ',',
            '"parent_id":', IFNULL(parent_id, 'null'), ',',
            '"menu":', menu, ',', 
            '"children":[],',
            '"label":"', label, '",',
            '"href":"', href, '"',
          '}'
        ) AS children
      FROM \`react-template2_menu\`
      WHERE parent_id IS NULL

      UNION ALL

      SELECT
        child.id,
        child.menu,
        child.label,
        child.href,
        child.parent_id,
        CONCAT(
          '{',
            '"id":', child.id, ',',
            '"parent_id":', IFNULL(child.parent_id, 'null'), ', ',
            '"menu":', child.menu, ',',
            '"children":[],',
            '"label":"', child.label, '",',
            '"href":"', child.href, '"',
          '}'
        ) AS children
      FROM \`react-template2_menu\` AS child
      JOIN item_hierarchy AS parent ON child.parent_id = parent.id
    )
    , aggregated AS (
      SELECT
        parent.id,
        parent.menu,
        parent.label,
        parent.href,
        parent.parent_id,
        CONCAT(
          '{',
            '"id":', parent.id, ',',
            '"parent_id":', IFNULL(parent.parent_id, 'null'), ',',
            '"menu":', parent.menu, ',',
            '"children":[', GROUP_CONCAT(child.children ORDER BY child.id SEPARATOR ','),'],',
            '"label":"', parent.label, '",',
            '"href":"', parent.href, '"',
          '}'
        ) AS children
      FROM item_hierarchy parent
      LEFT JOIN item_hierarchy child ON parent.id = child.parent_id
      GROUP BY parent.id, parent.label, parent.parent_id
    )
    SELECT id, label, href, children
    FROM aggregated
    WHERE parent_id IS NULL AND menu = ${menu};
  `);

  return data;
};