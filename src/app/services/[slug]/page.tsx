import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { FaqBlock } from '@/components/layout/content/faq/FaqBlock';
import { FaqSchema } from '@/components/layout/content/faq/FaqSchema';
import { ServiceHeading } from '@/components/layout/content/service/ServiceHeading';
import { ServiceHero } from '@/components/layout/content/service/ServiceHero';
import { ServiceObjects } from '@/components/layout/content/service/ServiceObjects';
import { Heading } from '@/components/layout/content/services/Heading';
import { ServiceRelated } from '@/components/layout/content/services/ServiceRelated';
import { ServicesList } from '@/components/layout/content/services/ServicesList';
import { ServicesText } from '@/components/layout/content/services/ServicesText';
import { DirectorForm } from '@/components/layout/form/director/DirectorForm';
import { EstimateForm } from '@/components/layout/form/estimate/EstimateForm';

import { getFaqItemsForSlugs } from '@/data/faq';
import { serviceService } from '@/services/service.service';
import type { TPageSlugProp } from '@/types/page.types';
import type { IService, IServiceCategory } from '@/types/service.types';

export async function generateMetadata({ params }: TPageSlugProp): Promise<Metadata> {
	const { slug } = await params;

	const catRes = await serviceService.getCategoryBySlug?.(slug);
	const category = catRes?.data?.data?.[0];
	if (category) {
		return {
			title: category.seo?.seoTitle || category.title,
			description: category.seo?.seoDescription || `Категория услуг: ${category.title}`,
			openGraph: {
				title: category.seo?.seoTitle || category.title,
				images: [category?.image?.url || ''],
				description: category.seo?.seoDescription || `Категория услуг: ${category.title}`
			}
		};
	}

	// Пытаемся получить услугу по slug
	const srvRes = await serviceService.getBySlug?.(slug);
	const service = srvRes?.data?.data?.[0];

	if (service) {
		return {
			title: service.seo?.seoTitle || service.title,
			description: service.seo?.seoDescription || `Услуга: ${service.title}`,
			openGraph: {
				title: service.seo?.seoTitle || service.title,
				images: [service?.image?.url || ''],
				description: service.seo?.seoDescription || `Услуга: ${service.title}`
			}
		};
	}

	return { title: 'Услуги', description: 'Раздел услуг компании' };
}

export async function generateStaticParams() {
	const [categoriesRes, servicesRes] = await Promise.all([
		serviceService.getCategories(),
		serviceService.getAll()
	]);

	const categories = categoriesRes.data.data ?? [];
	const services = servicesRes?.data?.data ?? [];

	return [
		...categories.map((c: IServiceCategory) => ({ slug: c.slug })),
		...services.map((s: IService) => ({ slug: s.slug }))
	];
}

export const dynamic = 'force-static';
export const revalidate = 300;

export default async function ServiceOrCategoryPage({ params }: TPageSlugProp) {
	const { slug } = await params;

	const catRes = await serviceService.getCategoryBySlug?.(slug);
	const category = catRes?.data?.data?.[0];

	//Если категория - рендерим категорию
	if (category) {
		const servicesRes = await serviceService.getServicesByCategorySlug?.(slug);
		const services = servicesRes?.data?.data ?? [];
		const faqItems = getFaqItemsForSlugs([slug]);

		return (
			<>
				<FaqSchema
					items={faqItems}
					id={`faq-schema-${slug}`}
				/>
				<Heading title={category.title} />
				<ServicesList items={services} />
				{category.description && <ServicesText text={category.description} />}
				{faqItems.length > 0 ? (
					<FaqBlock
						title='Частые вопросы'
						description='Подобрали ответы по этой группе услуг, чтобы быстрее сориентироваться по материалам, стоимости, срокам и условиям работы.'
						items={faqItems}
					/>
				) : null}
				<ServiceRelated category={category} />

				<div className='bg-light-gray'>
					<div className='layout-container py-20'>
						<DirectorForm />
						{/* <OrderForm title='Оставьте заявку на выполнение такого же проекта' /> */}
					</div>
				</div>
			</>
		);
	}

	// Если не категория — пробуем загрузить услугу
	const srvRes = await serviceService.getBySlug?.(slug);
	const service = srvRes?.data?.data?.[0];

	if (service) {
		const faqItems = getFaqItemsForSlugs([service.slug, service.service_category?.slug]);

		return (
			<>
				<FaqSchema
					items={faqItems}
					id={`faq-schema-${slug}`}
				/>
				<ServiceHeading service={service} />
				<ServiceHero service={service} />
				{service.description && <ServicesText text={service.description} />}
				{!!service.objects?.length && <ServiceObjects objects={service.objects} />}
				{faqItems.length > 0 ? (
					<FaqBlock
						title='Частые вопросы по услуге'
						description='Собрали ответы на вопросы, которые чаще всего возникают перед заказом и началом работ по этой услуге.'
						items={faqItems}
					/>
				) : null}
				<EstimateForm />
			</>
		);
	}

	//Иначе — 404
	notFound();
}
