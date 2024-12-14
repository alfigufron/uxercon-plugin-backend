import Database from "@config/database";
import IconEntity from "@entities/Icon.entity";
import PaginationUtils from "@utilities/pagination";
import { EntityManager, Repository } from "typeorm";

export default class IconRepository extends Repository<IconEntity> {
  private entityManager: EntityManager;

  constructor(
    manager: EntityManager = Database.getInstance().getDataSource().manager
  ) {
    super(IconEntity, manager);
  }

  setManager(manager: EntityManager) {
    this.entityManager = manager;
  }

  async findAndPaginate(
    limit: number,
    page: number,
    where?: Partial<{ variant: string; category: string }>
  ) {
    // const [result, total] = await this.findAndCount({
    //   order: { created_at: "DESC" },
    //   take: limit,
    //   skip: PaginationUtils.calculateOffset(limit, page),
    //   relations: ["variant"],
    //   where: {
    //     variant: {
    //       name: where.variant,
    //     },
    //   },
    // });

    const queryBuilder = this.createQueryBuilder("entity")
      .leftJoinAndSelect("entity.variant", "variant")
      .leftJoinAndSelect("entity.category", "category")
      .orderBy("entity.created_at", "DESC")
      .take(limit)
      .skip(PaginationUtils.calculateOffset(limit, page));

    if (where.variant)
      queryBuilder.andWhere("variant.name = :variantName", {
        variantName: where.variant,
      });

    if (where.category)
      queryBuilder.andWhere("category.name = :categoryName", {
        categoryName: where.category,
      });

    const [results, total] = await queryBuilder.getManyAndCount();

    return { results, total };
  }
}
