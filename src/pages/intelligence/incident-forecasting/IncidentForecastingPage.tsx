import { Fragment } from 'react';
import { Container } from '@/components/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle
} from '@/partials/toolbar';
import { IncidentForecastingContent } from './IncidentForecastingContent';
import { useLayout } from '@/providers';

const IncidentForecastingPage = () => {
  const { currentLayout } = useLayout();

  return (
    <Fragment>
      {currentLayout?.name === 'demo1-layout' && (
        <Container>
          <Toolbar>
            <ToolbarHeading>
              <ToolbarPageTitle />
              <ToolbarDescription>Forecast incidents using AI-driven insights</ToolbarDescription>
            </ToolbarHeading>
            <ToolbarActions>
              <a href="#" className="btn btn-sm btn-primary">
                Run Forecast
              </a>
            </ToolbarActions>
          </Toolbar>
        </Container>
      )}

      <Container>
        <IncidentForecastingContent />
      </Container>
    </Fragment>
  );
};

export default IncidentForecastingPage; 