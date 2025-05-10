import { Fragment } from 'react';
import { Container } from '@/components/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle
} from '@/partials/toolbar';
import { MetricsContent } from './MetricsContent';
import { useLayout } from '@/providers';

const MetricsPage = () => {
  const { currentLayout } = useLayout();

  return (
    <Fragment>
      {currentLayout?.name === 'demo1-layout' && (
        <Container>
          <Toolbar>
            <ToolbarHeading>
              <ToolbarPageTitle />
              <ToolbarDescription>View platform metrics and KPIs</ToolbarDescription>
            </ToolbarHeading>
            <ToolbarActions>
              <a href="#" className="btn btn-sm btn-primary">
                Export Metrics
              </a>
            </ToolbarActions>
          </Toolbar>
        </Container>
      )}

      <Container>
        <MetricsContent />
      </Container>
    </Fragment>
  );
};

export default MetricsPage; 